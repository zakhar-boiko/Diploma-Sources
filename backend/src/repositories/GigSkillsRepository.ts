import { randomUUID } from "crypto";
import { GigSkill } from "../models/GigSkill";
import { GigSkillType } from "../types/GigTypes";

const addGigSkills = async (
  gigId: string,
  skills: string[]
): Promise<GigSkillType[] | null> => {
  try {
    const gigSkills = skills.map((skill) => ({
      skillId: skill,
      gigId: gigId,
      id: randomUUID(),
    }));
    const newSkills = await GigSkill.bulkCreate(gigSkills, {
      returning: true,
    });
    return newSkills;
  } catch (error) {
    console.error("Error updating profile skills:", error);
    return null;
  }
};

export { addGigSkills };
