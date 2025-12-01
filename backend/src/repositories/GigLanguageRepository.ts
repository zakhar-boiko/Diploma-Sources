import { randomUUID } from "crypto";
import { GigLanguageType } from "../types/GigTypes";
import { GigLanguage } from "../models/GigLanguage";

const addGigLanguages = async (
  gigId: string,
  languages: string[]
): Promise<GigLanguageType[] | null> => {
  try {
    const gigLanguages = languages.map((language) => ({
      languageId: language,
      gigId: gigId,
      id: randomUUID(),
    }));
    const newLanguages = await GigLanguage.bulkCreate(gigLanguages, {
      returning: true,
    });
    return newLanguages;
  } catch (error) {
    console.error("Error updating profile languages:", error);
    return null;
  }
};

export { addGigLanguages };
