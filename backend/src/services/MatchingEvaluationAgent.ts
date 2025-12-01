import { MATCHING_QUALITY_THRESHOLD } from "../constants";
import { Gig } from "../models/Gig";
import { Language } from "../models/Language";
import { Skill } from "../models/Skill";
import { getGigById } from "../repositories/GigRepository";
import { getAllLanguagesById } from "../repositories/LanguagesRepository";
import { getAllSkillsById } from "../repositories/SkillsRepository";
import { findCandidateById } from "../repositories/UserRepository";
import { GigType } from "../types/GigTypes";
import {
  OverallCandidateMatchType,
  OverallGigMatchType,
} from "../types/MatchingTypes";
import { ConsultantType } from "../types/UserTypes";
import { askGroq } from "./GroqService";
import {
  calculateStringsMatch,
  regenerateBestCandidateMatches,
} from "./MatchingService";

const parseEvaluationResult = (response: string) => {
  const match = response.match(/{[\s\S]*?}/);
  if (!match) return null;
  try {
    const result = JSON.parse(match[0]);
    if ("accuracyScore" in result) {
      return result;
    }
    return null;
  } catch (e) {
    return { accuracyScore: 0 };
  }
};

const evaluateGigAndCandidatesMatchingResult = async (
  gigId: string,
  candidateMatches: OverallCandidateMatchType[]
) => {
  const gig = await getGigById(gigId);

  if (!gig) {
    return;
  }

  const falsePositiveMatches = [];
  const falseNegativeMatches = [];

  for (const match of candidateMatches) {
    const candidate = await findCandidateById(match.userId ?? "");

    if (!candidate) {
      continue;
    }

    const matchAccuracyScore = await evaluateGigAndCandidateMatchingScore(
      gig,
      candidate,
      match.percentage
    );

    const skillsMatch = calculateStringsMatch(
      gig.skills.map((skill) => skill.skillId),
      candidate?.skills?.map((skill) => skill.skillId) ?? []
    );

    console.log(
      `Match evaluation for ${match.userId} with a score of ${match.percentage}: matching score ${matchAccuracyScore}, skills match ${skillsMatch}`
    );

    if (matchAccuracyScore < MATCHING_QUALITY_THRESHOLD) {
      skillsMatch < Math.ceil(gig.skills.length / 2)
        ? falsePositiveMatches.push(match.userId ?? "")
        : falseNegativeMatches.push(match.userId ?? "");
    }
  }

  if (falsePositiveMatches.length > 0 || falseNegativeMatches.length > 0) {
    await regenerateBestCandidateMatches(
      gig,
      falsePositiveMatches,
      falseNegativeMatches
    );
  }
};

const evaluateCandidateAndGigsMatchingResult = async (
  candidateId: string,
  gigMatches: OverallGigMatchType[]
) => {
  const candidate = await findCandidateById(candidateId);

  if (!candidate) {
    return;
  }

  const falsePositiveMatches: string[] = [];
  const falseNegativeMatches: string[] = [];

  for (const match of gigMatches) {
    const gig = await getGigById(match.gigId ?? "");

    if (!gig) {
      continue;
    }

    const matchAccuracyScore = await evaluateGigAndCandidateMatchingScore(
      gig,
      candidate,
      match.percentage
    );

    const skillsMatch = calculateStringsMatch(
      gig.skills.map((skill) => skill.skillId),
      candidate.skills?.map((skill) => skill.skillId) ?? []
    );

    console.log(
      `Match evaluation for gig ${match.gigId} with a score of ${match.percentage}: matching score ${matchAccuracyScore}, skills match ${skillsMatch}`
    );

    if (matchAccuracyScore < MATCHING_QUALITY_THRESHOLD) {
      skillsMatch < Math.ceil(gig.skills.length / 2)
        ? falsePositiveMatches.push(match.gigId ?? "")
        : falseNegativeMatches.push(match.gigId ?? "");
    }
  }

  if (falsePositiveMatches.length > 0 || falseNegativeMatches.length > 0) {
    // await regenerateBestGigMatches(
    //   candidate,
    //   falsePositiveMatches,
    //   falseNegativeMatches
    // );
  }
};

const evaluateGigAndCandidateMatchingScore = async (
  gig: GigType,
  candidate: ConsultantType,
  score: number
) => {
  const preparedGig = {
    ...(gig as Gig).dataValues,
    skills:
      (await getAllSkillsById(gig.skills.map((skill) => skill.skillId))) ?? [],
    languages:
      (await getAllLanguagesById(
        gig.languages.map((language) => language.languageId)
      )) ?? [],
  };

  const preparedCandidate = {
    ...candidate,
    skills:
      (await getAllSkillsById(
        candidate?.skills?.map((skill) => skill.skillId) ?? []
      )) ?? [],
    languages:
      (await getAllLanguagesById(
        candidate?.languages?.map((language) => language.languageId) ?? []
      )) ?? [],
  };

  const prompt = `You are an assistant whose task is to evaluate the matching algorithm results. You are provided the data about the position, the candidate and the matching score that the algorithm has assigned to the candidate.
  The higher the score, the better the match. The score is a number between 0 and 100. I need you to analyze the data about the position and the candidate and evaluate the accuracy of the matching score.
  Info about the candidate starts after the phrase: \"Candidate information:\", info about the position starts after the phrase: \"Position information:\". The mathing score that you need to evaluate is after the phrase: \"Matching score:\".
  Youre response should be a JavaScript object that has an \"accuracyScore\" property that is a number between 0 and 100 that represents your assessment of the accuracy of the matching score. Consider ${MATCHING_QUALITY_THRESHOLD} as the threshold for a moderately good accuracy threshold. Make sure to evaluate not the candidate suitability for the position, but the accuracy of the defined matching score.
    Position information: \n
    Position role: ${preparedGig.title}
    Position preferable experience level: ${gig.profileLevel}\n
    Position preferable skills: ${preparedGig.skills
      .map((skill: Skill) => skill.name)
      .join(", ")}\n
    Position preferable languages: ${preparedGig.languages
      .map((language: Language) => language.name)
      .join(", ")}\n
    Position description: ${preparedGig.description} \n

    Candidate information: \n
    Candidate role: ${preparedCandidate.title}\n
    Candidate experience level: ${preparedCandidate.profileLevel}\n
    Candidate skills: ${preparedCandidate.skills
      .map((skill: Skill) => skill.name)
      .join(", ")}\n
    Candidate languages: ${preparedCandidate.languages
      .map((language: Language) => language.name)
      .join(", ")}\n
    Candidate description: ${preparedCandidate.description} \n
    Matching score: ${score} \n
`;

  const response = await askGroq(prompt);

  const parsedEvaluationResult = parseEvaluationResult(response);

  if (!parsedEvaluationResult) {
    return 0;
  }
  return parsedEvaluationResult.accuracyScore;
};

export { evaluateGigAndCandidatesMatchingResult, evaluateCandidateAndGigsMatchingResult };
