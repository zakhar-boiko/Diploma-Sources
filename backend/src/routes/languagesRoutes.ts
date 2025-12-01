import express from "express";
import { getAvailableLanguages } from "../controllers/LanguagesController";

const languagesRouter = express.Router();

languagesRouter.get("/", getAvailableLanguages)

export default languagesRouter;