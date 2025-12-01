import { Op } from "sequelize";
import { Skill } from "../models/Skill";
import { UserSkill } from "../models/UserSkill";

const getAllSkillsById = async (
  skillsIds: string[]
): Promise<Skill[] | null> => {
  const skills = Skill.findAll({
    where: {
      id: skillsIds,
    },
  });

  return skills;
};

const getAllSkills = async (): Promise<Skill[] | null> => {
  const skills = Skill.findAll();

  return skills;
};

const getUserSkills = async (userId: string): Promise<UserSkill[] | null> => {
  return UserSkill.findAll({
    where: {
      userId: userId,
    },
  });
};

const getSkillsByNames = async (names: string[]): Promise<Skill[] | null> => {
  return Skill.findAll({
    where: {
      name: {
        [Op.in]: names,
      },
    },
  });
};

export { getAllSkillsById, getAllSkills, getSkillsByNames,getUserSkills };
