import { Request, Response } from "express-serve-static-core";
import { getAllSkills } from "../repositories/SkillsRepository";

const getAvailableSkills = async (req: Request, res: Response) => {
  try {
    const skills = await getAllSkills();

    return res.status(200).send(skills);
  } catch (error) {
    console.error("Error fetching skills:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getAvailableSkills };
