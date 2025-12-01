import {
  getAllLanguages,
  getLanguagesByNames,
  getUserLanguages,
} from "../repositories/LanguagesRepository";
import {
  getAllSkills,
  getSkillsByNames,
  getUserSkills,
} from "../repositories/SkillsRepository";
import { ResumeScannerExtractedDataType } from "../types/ResumeScannerTypes";
import { askGroq } from "./GroqService";
import pdf from "pdf-parse";
import { callAiWithRetry } from "./MatchingService";
import { parse as bestEffortParse } from "best-effort-json-parser";

export const extractJsonFromResponse = <T>(response: string): T | null => {
  try {
    const match = response.match(/\{[\s\S]*\}|\[[\s\S]*\]/m)?.[0];
    if (!match) return null;

    console.log("Match: \n", match);

    // Try lenient parsing first
    const data = bestEffortParse(match);

    console.log("Parse: \n", data);
    return Array.isArray(data) ? data[0] : data;
  } catch (e) {
    console.log("error", e);
    return null;
  }
};

export const parseResumeExtractionResult = (
  response: string
): ResumeScannerExtractedDataType => {
  try {
    const match = response.match(/\{[\s\S]*\}/m)?.[0];
    if (!match) return { overview: "", skills: [], languages: [] };

    const data = JSON.parse(match);
    const result = Array.isArray(data) ? data[0] : data;

    if (
      result?.overview &&
      Array.isArray(result.skills) &&
      Array.isArray(result.languages)
    ) {
      return result;
    }
  } catch {}
  return { overview: "", skills: [], languages: [] };
};

const extractResumeData = async (
  file: Express.Multer.File
): Promise<ResumeScannerExtractedDataType> => {
  try {
    const skills = await getAllSkills();
    const skillNames = skills?.map((skill) => skill.name) ?? [];
    const languages = await getAllLanguages();
    const languageNames = languages?.map((language) => language.name) ?? [];
    const data = await pdf(file.buffer);
    const fileContent = data.text;

    const prompt = `
      You are a data extraction assistant. Your task is to read and analyze the provided resume text
      and extract structured information into three main sections: "overview", "skills", and "languages".
      
      The "overview" should contain a concise description of the candidate's profile, including their role,
      seniority level, and main expertise area, make it approximately 500 symbols long.
      !important  Your response should be a JavaScript object that has an \"overview\" property that is a string of a person's professional description, a \"skills\" property that is an array of strings, and a \"languages\" property that is an array of strings. Do not include any code or analysis, all i need is a JSON object.

      The "skills" field should list only those skills that appear in the resume AND match the following known skill set:
    ${skillNames.join(", ")}.
      The "languages" field should list only those languages that appear in the resume AND match the following known language set:
      ${languageNames.join(", ")}.

      Resume text:
      """
      ${fileContent}
      """
      `;

    const result = await callAiWithRetry<ResumeScannerExtractedDataType>(
      prompt,
      (response) => {
        const parsed = parseResumeExtractionResult(response);
        return parsed.overview ||
          parsed.skills.length ||
          parsed.languages.length
          ? parsed
          : null;
      }
    );

    return result ?? { overview: "", skills: [], languages: [] };
  } catch (error) {
    console.error("Error extracting resume data:", error);
    return { overview: "", skills: [], languages: [] };
  }
};

const extractUserSkills = async (userId: string, skillNames: string[]) => {
  const extraxtedExistingSkills = await getSkillsByNames(skillNames);
  const userSkills = await getUserSkills(userId);

  const newSkills =
    extraxtedExistingSkills
      ?.filter((skill) => {
        return !userSkills?.some((s) => s.dataValues.skillId === skill.id);
      })
      .map((skill) => skill.id) ?? [];

  return newSkills;
};

const extractUserLanguages = async (
  userId: string,
  languageNames: string[]
) => {
  const extraxtedExistingLanguages = await getLanguagesByNames(languageNames);
  const userLanguages = await getUserLanguages(userId);

  const newLanguages =
    extraxtedExistingLanguages
      ?.filter(
        (language) =>
          !userLanguages?.some((l) => l.dataValues.languageId === language.id)
      )
      .map((language) => language.id) ?? [];

  return newLanguages;
};

export { extractResumeData, extractUserSkills, extractUserLanguages };
