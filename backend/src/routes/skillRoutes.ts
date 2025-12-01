import express from "express";
import { getAvailableSkills } from "../controllers/SkillsController";

const skillsRouter = express.Router();

skillsRouter.get("/", getAvailableSkills)

export default skillsRouter;