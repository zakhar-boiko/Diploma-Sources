import OpenAI from "openai";

import {
  CandidateType,
  ConsultantType,
  LanguageType,
  SkillType,
} from "../types/UserTypes";
import {
  AiAnalyzedCandidateMatchType,
  MatchedGigType,
  MatchedUserType,
  OverallCandidateMatchType,
} from "../types/MatchingTypes";
import { ProfileLevel } from "../types/enums/UserEnums";
import {
  addSuitableUsers,
  deleteAllSuitableUsersByGigId,
  deleteSuitableUsersByGigIdAndUserIds,
  getSuitableUsersByGigId,
} from "../repositories/SuitableUsersRepository";
import { GigType } from "../types/GigTypes";
import {
  addSuitableGigs,
  deleteSuitableGigsByUserId,
} from "../repositories/SuitableGigsRepository";
import { round } from "../utils/round";
import {
  findAllCandidatesWithDescriptionOrSkills,
  findCandidateById,
} from "../repositories/UserRepository";
import { getAllGigs, getGigById } from "../repositories/GigRepository";
import { askGroq } from "./GroqService";
import { Candidate } from "../models/Candidate";
import { getAllSkillsById } from "../repositories/SkillsRepository";
import { getAllLanguagesById } from "../repositories/LanguagesRepository";
import { Skill } from "../models/Skill";
import { Language } from "../models/Language";
import { Gig } from "../models/Gig";
import { shuffleArray } from "../utils/shuffleArray";
import { OVERVIEW_WEIGHT, SKILLS_WEIGHT } from "../constants";
import {
  evaluateCandidateAndGigsMatchingResult,
  evaluateGigAndCandidatesMatchingResult,
} from "./MatchingEvaluationAgent";

const callAiWithRetry = async <T>(
  prompt: string,
  parser: (response: string) => T | null,
  retries = 2
): Promise<T | null> => {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await askGroq(prompt);
      const parsed = parser(response);
      if (parsed) return parsed;
    } catch (err) {
      console.error(`AI call attempt ${attempt} failed:`, err);
    }
  }
  return null;
};

const dotProduct = (vector1: number[], vector2: number[]) => {
  return vector1.reduce(
    (accumulator, value, index) => accumulator + value * vector2[index],
    0
  );
};

const magnitude = (vector: number[]) => {
  return Math.sqrt(
    vector.reduce((accumulator, value) => accumulator + value ** 2, 0)
  );
};

function calculateSimilarity(vector1: number[], vector2: number[]) {
  if (vector1.length !== vector2.length || vector1.length == 0) {
    return 0;
  }

  const dot = dotProduct(vector1, vector2);
  const magnitude1 = magnitude(vector1);
  const magnitude2 = magnitude(vector2);

  return dot / (magnitude1 * magnitude2);
}

const getEmbeddings = async (data: string) => {
  const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
  });

  try {
    const response = await openai.embeddings.create({
      input: data,
      model: "text-embedding-3-small",
    });
    const embeddings = response.data[0].embedding;
    return embeddings;
  } catch (e) {
    console.log(JSON.stringify(e));
    return [];
  }
};

const extractSuitableMatchesFromResponse = (
  text: string
): AiAnalyzedCandidateMatchType[] => {
  const match = text.match(/\[\s*{[\s\S]*?}\s*\]/);
  if (!match) return [];

  try {
    const matches = JSON.parse(match[0]);
    return Array.isArray(matches)
      ? matches.filter(
          (match: AiAnalyzedCandidateMatchType) =>
            typeof match.id !== "undefined" &&
            typeof match.overviewScore !== "undefined" &&
            typeof match.skillsScore !== "undefined"
        )
      : [];
  } catch (e) {
    return [];
  }
};

const getAnalyzedCandidates = async (
  prompt: string,
  retries = 1
): Promise<AiAnalyzedCandidateMatchType[]> => {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await askGroq(prompt);
      const matches = extractSuitableMatchesFromResponse(response);
      if (matches.length) return matches;
    } catch (err) {
      console.log(JSON.stringify(err));
    }
  }
  return [];
};

const analyzeCandidatesAndGigSutabilityWithAi = async (
  gig: Pick<GigType, "title" | "profileLevel" | "description"> & {
    skills: Skill[];
    languages: Language[];
  },
  candidates: (Pick<ConsultantType, "description" | "profileLevel" | "id"> & {
    skills: Skill[];
    languages: Language[];
  })[]
): Promise<AiAnalyzedCandidateMatchType[]> => {
  const prompt = `Given a information about the position and ${
    candidates.length
  } users. Please analyze data provided and rate each user in each of the 2 categories:
    Overview, Skills that would represent the degree of suitability between the user and the position in this category. Info about the candidate starts after the phrase: New User, do not include results from one user to another. 
    Structure the output as a JSON array consisting of objects (all keys and entries should be in double quotes). Each object should have an \"id\" property representing the user's ID, and properties for suitability in each caetgory: \"overviewScore\", \"skillsScore\" that are numbers of percentage (ranging from 0 to 100) for the user suitability for the position in the category.
    The assessment should be based on a comparison of the provided users data with the Position. 
    Position information: \n
    Position role: ${gig.title}
    Position preferable experience level: ${gig.profileLevel}
    Position preferable skills: ${gig.skills
      .map((skill) => skill.name)
      .join(", ")}
    Position preferable languages: ${gig.languages
      .map((language) => language.name)
      .join(", ")}
    Position description: ${gig.description} \n

    Users information: \n
    ${candidates
      .map(
        (candidate) =>
          `New User - UserID: ${candidate.id}\nOverview: ${
            candidate.description
          }\nSkills: ${candidate?.skills
            ?.map((skill) => skill.name)
            .join(", ")}\nLanguages: ${candidate?.languages
            ?.map((language) => language.name)
            .join(", ")}\nExperience level: ${candidate.profileLevel}\n`
      )
      .join("\n")}
 End of the users information. Make sure to return result just in form of array of JavaScript objects without any greetings or other information, because it's crucial for my functionality.`;

  return getAnalyzedCandidates(prompt);
};

const analyzeGigsAndCandidateSuitabilityWithAi = async (
  candidate: Pick<ConsultantType, "description" | "profileLevel" | "id"> & {
    skills: Skill[];
    languages: Language[];
  },
  gigs: (Pick<GigType, "id" | "title" | "profileLevel" | "description"> & {
    skills: Skill[];
    languages: Language[];
  })[]
): Promise<AiAnalyzedCandidateMatchType[]> => {
  const prompt = `Given information about one user and ${
    gigs.length
  } positions, analyze the suitability of this user for each position.
Please evaluate and rate each position in two categories:
  1. "overviewScore" — how well the position matches the user's overall experience and background
  2. "skillsScore" — how well the required skills match the user's skills.

Structure the output strictly as a JSON array of objects (all keys and string values must be in double quotes).
Each object should include:
  - "id": the position (gig) ID
  - "overviewScore": number (0–100)
  - "skillsScore": number (0–100)

Do not include any extra text, commentary, or greetings — only the JSON array.

User information:
User ID: ${candidate.id}
User Overview: ${candidate.description}
User Skills: ${candidate.skills.map((s) => s.name).join(", ")}
User Languages: ${candidate.languages.map((l) => l.name).join(", ")}
User Experience level: ${candidate.profileLevel}

Positions information:
${gigs
  .map(
    (gig) => `New Position - GigID: ${gig.id}
Title: ${gig.title}
Required Experience Level: ${gig.profileLevel}
Preferred Skills: ${gig.skills.map((s) => s.name).join(", ")}
Preferred Languages: ${gig.languages.map((l) => l.name).join(", ")}
Description: ${gig.description}`
  )
  .join("\n\n")}

End of the positions information. Return the result ONLY as a JSON array of JavaScript objects.`;

  return getAnalyzedCandidates(prompt);
};

const calculateStringsMatch = (
  strings1: string[],
  strings2: string[]
): number => {
  const matchedStrings = strings1.filter((string) => strings2.includes(string));

  return matchedStrings.length;
};

const scoreComparator = (
  c1: MatchedUserType | MatchedGigType,
  c2: MatchedUserType | MatchedGigType
) => {
  return c2.score - c1.score;
};

const generateCandidateMatches = async (
  gig: GigType,
  omitCandidateIds: string[] = []
) => {
  try {
    const allCandidates = await findAllCandidatesWithDescriptionOrSkills(
      omitCandidateIds
    );

    let skillsMatches: MatchedUserType[] = [];

    if (gig.skills.length > 1) {
      skillsMatches = [...allCandidates]
        ?.map((candidate) => {
          const skillMatches = calculateStringsMatch(
            candidate?.skills?.map((skill) => skill?.skillId) ?? [],
            gig?.skills?.map((skill) => skill?.skillId) ?? []
          );

          return {
            candidate: candidate,
            score: skillMatches / gig.skills.length,
          };
        })
        .sort(scoreComparator)
        .slice(0, 3);
    }

    const remainingCandidates = allCandidates.filter(
      (candidate) =>
        !skillsMatches.some((match) => match.candidate.id == candidate.id)
    );

    const vectorMatches = remainingCandidates
      ?.map((candidate) => {
        return {
          score: calculateCandidateAndGigVectorSimilarity(candidate, gig),
          candidate: candidate,
        };
      })
      .sort(scoreComparator)
      .slice(0, 6 - skillsMatches.length);

    const preparedCandidates = await Promise.all(
      shuffleArray([...skillsMatches, ...vectorMatches]).map(async (match) => ({
        ...(match.candidate as Candidate).dataValues,
        skills:
          (await getAllSkillsById(
            match?.candidate?.skills?.map((skill) => skill.skillId) ?? []
          )) ?? [],
        languages:
          (await getAllLanguagesById(
            match?.candidate?.languages?.map(
              (language) => language.languageId
            ) ?? []
          )) ?? [],
      }))
    );

    const preparedGig = {
      ...(gig as Gig).dataValues,
      skills:
        (await getAllSkillsById(gig.skills.map((skill) => skill.skillId))) ??
        [],
      languages:
        (await getAllLanguagesById(
          gig.languages.map((language) => language.languageId)
        )) ?? [],
    };

    const analyzedMatchesScores = (
      await Promise.all(
        [0, 3].map((i) =>
          analyzeCandidatesAndGigSutabilityWithAi(
            preparedGig,
            preparedCandidates.slice(i, i + 3)
          )
        )
      )
    ).flat();

    const bestCandidateMatches = analyzedMatchesScores
      .reduce(
        (arr, currentMatch) => {
          const candidate: ConsultantType = preparedCandidates.find(
            (candidate) => candidate.id == currentMatch.id
          );

          if (candidate) {
            return [
              ...arr,
              {
                candidate,
                overviewScore: currentMatch.overviewScore,
                skillsScore: currentMatch.skillsScore,
              },
            ];
          }

          return arr;
        },
        [] as {
          candidate: ConsultantType;
          overviewScore: number;
          skillsScore: number;
        }[]
      )
      .map((candidateData) => {
        return {
          userId: candidateData.candidate.userId,
          percentage: calculateCandidateAndGigSuitability(
            candidateData.candidate,
            gig,
            candidateData.overviewScore,
            candidateData.skillsScore
          ),
        };
      })
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 3);

    return bestCandidateMatches;
  } catch (e) {
    console.log(JSON.stringify(e));
    return [];
  }
};

const findBestMatchingCandidates = async (gigId: string) => {
  const gig = await getGigById(gigId);

  if (!gig) {
    return;
  }

  const bestCandidateMatches = await generateCandidateMatches(gig);

  await deleteAllSuitableUsersByGigId(gigId);
  await addSuitableUsers(gigId, bestCandidateMatches);
  await evaluateGigAndCandidatesMatchingResult(gigId, bestCandidateMatches);
};

const regenerateBestCandidateMatches = async (
  gig: GigType,
  falsePositiveCandidateIds: string[],
  falseNegativeCandidateIds: string[]
) => {
  console.log("False positive candidate ids: ", falsePositiveCandidateIds);
  console.log("False negative candidate ids: ", falseNegativeCandidateIds);

  const existingMatches = await getSuitableUsersByGigId(gig.id);

  const omitCandidateIds = existingMatches
    .filter((match) => !falseNegativeCandidateIds.includes(match.userId))
    .map((match) => match.userId);

  console.log("Omit candidate ids: ", omitCandidateIds);

  const additionalMatches = await generateCandidateMatches(
    gig,
    omitCandidateIds
  );

  const bestCandidateMatches = additionalMatches.slice(
    0,
    falsePositiveCandidateIds.length + falseNegativeCandidateIds.length
  );

  console.log("Best candidate matches: ", JSON.stringify(bestCandidateMatches));

  await deleteSuitableUsersByGigIdAndUserIds(gig.id, [
    ...falsePositiveCandidateIds,
    ...falseNegativeCandidateIds,
  ]);
  await addSuitableUsers(gig.id, bestCandidateMatches);
  const finelExistingMatches = await getSuitableUsersByGigId(gig.id);
  console.log("Final existing matches: ", JSON.stringify(finelExistingMatches));
};

const profileLevelCorrection = (
  level1: ProfileLevel,
  level2: ProfileLevel
): number => {
  return level1 === level2 ? 1 : Math.abs(level1 - level2) === 1 ? 0 : -1;
};

const languagesCorrection = (
  languages1: string[],
  languages2: string[]
): number => {
  const matchResult = calculateStringsMatch(languages1, languages2);
  return matchResult === 0
    ? -1
    : matchResult / Math.max(languages2.length, languages1.length);
};

const calculateCandidateAndGigSuitability = (
  candidate: ConsultantType,
  gig: GigType,
  overviewScore: number,
  skillsScore: number
) => {
  const secondaryWeight = (1 - (OVERVIEW_WEIGHT + SKILLS_WEIGHT)) / 2;

  const overallSuitability =
    overviewScore * OVERVIEW_WEIGHT +
    skillsScore * SKILLS_WEIGHT +
    profileLevelCorrection(
      candidate?.profileLevel ?? ProfileLevel.ENTRY_LEVEL,
      gig.profileLevel
    ) *
      secondaryWeight +
    languagesCorrection(
      candidate.languages?.map((language) => language.languageId) ?? [],
      gig.languages?.map((language) => language.languageId) ?? []
    ) *
      secondaryWeight;

  return Math.min(Math.max(Math.round(overallSuitability), 0), 100);
};

const calculateCandidateAndGigVectorSimilarity = (
  candidate: ConsultantType,
  gig: GigType
): number => {
  const descriptionSimilarity = calculateSimilarity(
    candidate.vector ?? [],
    gig.gigVector ?? []
  );

  return descriptionSimilarity;
};

const generateGigMatches = async (candidateId: string) => {
  try {
    const candidate = await findCandidateById(candidateId);
    if (!candidate) return;

    const allGigs = await getAllGigs();
    let skillsMatches: MatchedGigType[] = [];

    if ((candidate?.skills?.length ?? 0) > 1) {
      skillsMatches = [...allGigs]
        .map((gig) => {
          const skillMatches = calculateStringsMatch(
            candidate?.skills?.map((skill) => skill?.skillId) ?? [],
            gig.skills?.map((skill) => skill?.skillId) ?? []
          );
          return {
            gig,
            score: skillMatches / (candidate?.skills?.length ?? 1),
          };
        })
        .sort(scoreComparator)
        .slice(0, 3);
    }

    const remainingGigs = allGigs.filter(
      (gig) => !skillsMatches.some((match) => match.gig.id === gig.id)
    );

    const vectorMatches = remainingGigs
      .map((gig) => ({
        gig,
        score: calculateCandidateAndGigVectorSimilarity(candidate, gig),
      }))
      .sort(scoreComparator)
      .slice(0, 6 - skillsMatches.length);

    const preparedGigs = await Promise.all(
      shuffleArray([...skillsMatches, ...vectorMatches]).map(async (match) => ({
        ...(match.gig as Gig).dataValues,
        skills:
          (await getAllSkillsById(
            match?.gig?.skills?.map((s) => s.skillId) ?? []
          )) ?? [],
        languages:
          (await getAllLanguagesById(
            match?.gig?.languages?.map((l) => l.languageId) ?? []
          )) ?? [],
      }))
    );

    const preparedCandidate = {
      ...(candidate as Candidate).dataValues,
      skills:
        (await getAllSkillsById(
          candidate.skills?.map((skill) => skill.skillId) ?? []
        )) ?? [],
      languages:
        (await getAllLanguagesById(
          candidate.languages?.map((language) => language.languageId) ?? []
        )) ?? [],
    };

    const analyzedMatchesScores = (
      await Promise.all(
        [0, 3].map((i) =>
          analyzeGigsAndCandidateSuitabilityWithAi(
            preparedCandidate,
            preparedGigs.slice(i, i + 3)
          )
        )
      )
    ).flat();

    const bestGigMatches = analyzedMatchesScores
      .reduce(
        (arr, currentMatch) => {
          const gig = preparedGigs.find((g) => g.id === currentMatch.id);

          if (gig) {
            return [
              ...arr,
              {
                gig,
                overviewScore: currentMatch.overviewScore,
                skillsScore: currentMatch.skillsScore,
              },
            ];
          }
          return arr;
        },
        [] as {
          gig: GigType;
          overviewScore: number;
          skillsScore: number;
        }[]
      )
      .map((gigData) => ({
        gigId: gigData.gig.id,
        percentage: calculateCandidateAndGigSuitability(
          preparedCandidate,
          gigData.gig,
          gigData.overviewScore,
          gigData.skillsScore
        ),
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 3);

    await deleteSuitableGigsByUserId(candidateId);
    await addSuitableGigs(candidateId, bestGigMatches);
  } catch (e) {
    console.log("Error generating gig matches:", JSON.stringify(e));
  }
};

export {
  getEmbeddings,
  calculateSimilarity,
  findBestMatchingCandidates as generateCandidateMatches,
  generateGigMatches,
  magnitude,
  dotProduct,
  calculateCandidateAndGigSuitability,
  calculateStringsMatch,
  calculateCandidateAndGigVectorSimilarity,
  profileLevelCorrection,
  languagesCorrection,
  regenerateBestCandidateMatches,
  callAiWithRetry,
};
