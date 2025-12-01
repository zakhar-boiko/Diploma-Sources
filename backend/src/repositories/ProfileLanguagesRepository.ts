import { randomUUID } from "crypto";
import { UserLanguage } from "../models/UserLanguage";

const addUserLanguages = async (
  userId: string,
  languages: string[]
): Promise<UserLanguage[] | null> => {
  try {
    const userLanguages = languages.map((language) => ({
      languageId: language,
      userId: userId,
      id: randomUUID(),
    }));
    const newLanguages = await UserLanguage.bulkCreate(userLanguages, {
      returning: true,
    });
    return newLanguages;
  } catch (error) {
    console.error("Error updating profile languages:", error);
    return null;
  }
};

const deleteUserLanguages = async (userId: string): Promise<void> => {
  try {
    await UserLanguage.destroy({
      where: {
        userId: userId,
      },
    });
  } catch (error) {
    console.error("Error deleting user languages:", error);
  }
};

export { deleteUserLanguages, addUserLanguages };
