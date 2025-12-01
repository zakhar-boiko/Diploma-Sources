import { Sequelize } from "sequelize-typescript";
import { User } from "../models/User";
import { Candidate } from "../models/Candidate";
import { Recruiter } from "../models/Recruiter";
import { Experience } from "../models/Experience";
import { Language } from "../models/Language";
import { Skill } from "../models/Skill";
import { GigSuitability } from "../models/GigSuitability";
import { GigSuitableUser } from "../models/GigSuitableUser";
import { Gig } from "../models/Gig";
import { UserSuitability } from "../models/UserSuitability";
import { UserSuitableGigs } from "../models/UserSuitableGigs";
import { UserSkill } from "../models/UserSkill";
import { GigSkill } from "../models/GigSkill";
import { UserLanguage } from "../models/UserLanguage";
import { GigLanguage } from "../models/GigLanguage";
require("dotenv").config();

const db = new Sequelize(
  process.env.DATABASE_NAME as string,
  process.env.DATABASE_USERNAME as string,
  process.env.DATABASE_PASSWORD as string,
  {
    host: "localhost",
    port: 5432,
    dialect: "postgres",
    logging: false,
    models: [
      GigSuitability,
      Skill,
      Candidate,
      Recruiter,
      Experience,
      GigSuitableUser,
      UserSuitability,
      UserSuitableGigs,
      UserSkill,
      GigSkill,
      UserLanguage,
      GigLanguage,
      Gig,
      Language,
      User,
    ],
  }
);
export default db;
