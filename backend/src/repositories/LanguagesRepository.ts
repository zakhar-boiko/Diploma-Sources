import { Language } from "../models/Language";
import { Op } from "sequelize";
import { UserLanguage } from "../models/UserLanguage";

const getAllLanguages = async (): Promise<Language[] | null> => {
  const languages = Language.findAll();

  return languages;
};

const getAllLanguagesById = async (
  languagesIds: string[]
): Promise<Language[] | null> => {
  const languages = Language.findAll({
    where: {
      id: languagesIds,
    },
  });

  return languages;
};

const getLanguagesByNames = async (names: string[]): Promise<Language[] | null> => {
  return Language.findAll({
    where: {
      name: {
        [Op.in]: names,
      },
    },
  });
};

const getUserLanguages = async (userId: string): Promise<UserLanguage[] | null> => {
  return UserLanguage.findAll({
    where: {
      userId: userId,
    },
  });
};

export { getAllLanguages, getAllLanguagesById, getLanguagesByNames, getUserLanguages };
