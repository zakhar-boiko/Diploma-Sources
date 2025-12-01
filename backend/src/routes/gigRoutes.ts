import express from "express";
import {
  chatWithGigCreatorAssistant,
  createGig,
  getGigById,
  getGigMatches,
  getPaginatedGigs,
  summarizeGigFromConversation,
} from "../controllers/GigController";

const gigRouter = express.Router();

gigRouter.post("/", createGig);

gigRouter.get("/:id", getGigById);

gigRouter.get("/matches/:id", getGigMatches);

gigRouter.post("/assistant/chat", chatWithGigCreatorAssistant);

gigRouter.post("/assistant/summarize", summarizeGigFromConversation);

gigRouter.get("/", getPaginatedGigs);

export default gigRouter;
