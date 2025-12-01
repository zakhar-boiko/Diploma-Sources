import { Experience } from "../models/Experience";
import { Skill } from "../models/Skill";
import { ExperienceType, SkillType } from "../types/UserTypes";

const addUserExperience = async (
  userId: string,
  experience: ExperienceType
): Promise<Experience | null> => {
  try {
    experience.userId = userId;

    const createdExperience = await Experience.create(experience);
    return createdExperience;
  } catch (error) {
    console.error("Error creating profile experience:", error);
    return null;
  }
};

const updateUserExperience = async (
  experience: ExperienceType
): Promise<Experience | null> => {
  try {
    const existingExperience = await Experience.findByPk(experience.id);

    if (!existingExperience) {
      throw Error("Experince not found");
    }

    return await existingExperience.update(experience);
  } catch (error) {
    console.error("Error updating profile experience:", error);
    return null;
  }
};

const deleteUserExperience = async (experienceId: string): Promise<void> => {
  try {
    const existingExperience = await Experience.findByPk(experienceId);

    if (!existingExperience) {
      throw Error("Experience not found");
    }

    return await existingExperience.destroy();
  } catch (error) {
    console.error("Error deleting user experience:", error);
  }
};

export { deleteUserExperience, addUserExperience, updateUserExperience };
