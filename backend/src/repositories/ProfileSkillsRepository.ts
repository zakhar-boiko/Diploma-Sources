import { randomUUID } from "crypto";
import { UserSkill } from "../models/UserSkill";

const addUserSkills = async (
  userId: string,
  skills: string[]
): Promise<UserSkill[] | null> => {
  try {
    const userSkills = skills.map((skill) => ({
      skillId: skill,
      userId: userId,
      id: randomUUID(),
    }));
    const newSkills = await UserSkill.bulkCreate(userSkills, {
      returning: true,
    });
    return newSkills;
  } catch (error) {
    console.error("Error updating profile skills:", error);
    return null;
  }
};

const deleteUserSkills = async (userId: string): Promise<void> => {
  await UserSkill.destroy({
    where: {
      userId: userId,
    },
  });
};

export { deleteUserSkills, addUserSkills };
