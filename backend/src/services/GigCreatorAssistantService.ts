import {
  getAllLanguages,
  getLanguagesByNames,
} from "../repositories/LanguagesRepository";
import {
  getAllSkills,
  getSkillsByNames,
} from "../repositories/SkillsRepository";
import { AssistantMessageType } from "../types/GigAssistantTypes";
import { GigRequestType } from "../types/GigTypes";
import { askGroq } from "./GroqService";
import { callAiWithRetry } from "./MatchingService";
import {
  extractJsonFromResponse,
} from "./ResumeDataExtractorService";

export const getGigCreatorAssistantReply = async (
  messages: AssistantMessageType[]
): Promise<AssistantMessageType> => {
  try {
    const relevantMessages =
      messages.length > 20 ? [messages[0], ...messages.slice(-19)] : messages;

    const conversation = relevantMessages
      .map((m) => `${m.role}: ${m.content}`)
      .join("\n");

    const prompt = `
      You are an AI assistant that helps recruiters create and refine job postings ("gigs").
      Your goal is to interact conversationally and guide the recruiter in filling out all fields of a gig.
      
      A gig has the following structure:
      {
        "title": string,
        "profileLevel": one of ["ENTRY_LEVEL", "JUNIOR", "MIDDLE", "SENIOR", "EXPERT"], in chat replace them with human-friendly names,
        "skills": string[],
        "languages": string[],
        "description": string
      }
      
      Guidelines:
      - Be proactive, try suggesting as much as possible, do not wait for the recruiter to ask you
      - Try suggesting as much as possible and guide the recruiter instead of asking questions
      - Inside the "content" do not use additional json or code elements like array, objects or enum values, keep it human-friendly.
      - Always respond as a JSON object with the following structure:
        {
          "role": "ASSISTANT",
          "content": "..."
        }
      
      Conversation so far:
      """
      ${conversation}
      """
      
      Now provide your next reply as the assistant as a Javascript object that has a \"role\" property that is \"ASSISTANT\" and a \"content\" property that is a string. Do not include any code or analysis, all i need is a JSON object.`;

    const response = await askGroq(prompt);

    console.log("Response: \n", response);

    try {
      const parsed = extractJsonFromResponse<AssistantMessageType>(response);
      if (parsed) {
        return parsed;
      }
    } catch {
      return { role: "ASSISTANT", content: response.trim() };
    }

    return { role: "ASSISTANT", content: response.trim() };
  } catch (err) {
    console.error("Error generating assistant reply:", err);
    return {
      role: "ASSISTANT",
      content: "Sorry, I encountered an error while generating my response.",
    };
  }
};

export const generateGigFromConversation = async (
  messages: AssistantMessageType[]
): Promise<
  Pick<
    GigRequestType,
    "title" | "profileLevel" | "description" | "skills" | "languages"
  >
> => {
  try {
    const skills = await getAllSkills();
    const skillNames = skills?.map((s) => s.name) ?? [];

    const languages = await getAllLanguages();
    const languageNames = languages?.map((l) => l.name) ?? [];

    const relevantMessages =
      messages.length > 20 ? [messages[0], ...messages.slice(-19)] : messages;

    const conversation = relevantMessages
      .map((m) => `${m.role}: ${m.content}`)
      .join("\n");

    const prompt = `
You are an AI assistant that helps recruiters create and refine job postings ("gigs").
Analyze the following conversation between a recruiter and the assistant, and based on it,
produce a complete gig object representing the position they discussed.

A gig must have this structure:
{
  "title": string,
  "profileLevel": one of ["ENTRY_LEVEL", "JUNIOR", "MIDDLE", "SENIOR", "EXPERT"],
  "skills": string[],
  "languages": string[],
  "description": string
}

Guidelines:
- !important Pick "skills" only from this known list, if the conversation does not include the existing skills, pick the suitable skills for this role, make sure that the name of the skills exactly matches the name of the skill in the known list. Skill options: ${skillNames.join(
      ", "
    )}, .
- Pick "languages" only from this known list: ${languageNames.join(", ")}.
- The "title" should be a clear and concise position name.
- The "description" should summarize the role, responsibilities, and requirements. Make it approximately 500 symbols long.
- Ensure the JSON is syntactically valid (no comments or extra text).
- Return **only** the JavaScript object (no explanation).

Conversation:
"""
${conversation}
"""
    `;

    const gig = await callAiWithRetry<
      Pick<
        GigRequestType,
        "title" | "profileLevel" | "skills" | "languages" | "description"
      >
    >(prompt, (response) => {
      const parsed =
        extractJsonFromResponse<
          Pick<
            GigRequestType,
            "title" | "profileLevel" | "skills" | "languages" | "description"
          >
        >(response);
      return parsed;
    });

    if (
      gig?.title &&
      gig?.description &&
      Array.isArray(gig.skills) &&
      Array.isArray(gig.languages)
    ) {
      const existingSkills = await getSkillsByNames(gig.skills);
      const existingLanguages = await getLanguagesByNames(gig.languages);
      return {
        title: gig.title,
        profileLevel: gig.profileLevel,
        skills: existingSkills?.map((s) => s.id) ?? [],
        languages: existingLanguages?.map((l) => l.id) ?? [],
        description: gig.description,
      };
    }

    return {
      title: "",
      profileLevel: 0,
      skills: [],
      languages: [],
      description: "",
    };
  } catch (error) {
    console.error("Error generating gig from conversation:", error);
    return {
      title: "",
      profileLevel: 0,
      skills: [],
      languages: [],
      description: "",
    };
  }
};
