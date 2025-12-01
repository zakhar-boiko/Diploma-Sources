import { Request, Response } from "express-serve-static-core";
import { GigRequestType, GigType } from "../types/GigTypes";
import { TypedRequestBody } from "../types/RequestTypes";
import { SignedTokenType } from "../types/UserTypes";
import jwt from "jsonwebtoken";
import { UUID, randomUUID } from "crypto";
import { addGigSkills } from "../repositories/GigSkillsRepository";
import { addGigLanguages } from "../repositories/GigLanguageRepository";
import {
  generateCandidateMatches,
  getEmbeddings,
} from "../services/MatchingService";
import GigDTO from "../dtos/GigDTO";
import {
  addGigSuitability,
  getGigSuitableUsers,
} from "../repositories/GigSuitabilityRepository";
import UserMatchDTO from "../dtos/UserMatchDTO";
import {
  createGig,
  getGigById,
  getPaginatedGigs,
} from "../repositories/GigRepository";
import {
  generateGigFromConversation,
  getGigCreatorAssistantReply,
} from "../services/GigCreatorAssistantService";
import { AssistantMessageType } from "../types/GigAssistantTypes";

const addGig = async (req: TypedRequestBody<GigRequestType>, res: Response) => {
  try {
    const token = req.header("Authorization");
    const decoded = jwt.verify(
      token as string,
      process.env.SECRET_KEY as string
    );

    const userId = (decoded as SignedTokenType)?.userId;

    if (!userId) {
      return res.status(400).send({ erorr: "Invalid token" });
    }

    const gig = req.body;

    gig.creatorId = userId as UUID;
    gig.publicationDate = new Date();

    gig.gigVector = await getEmbeddings(gig.description);

    const newGig = await createGig(gig);

    await addGigSkills(newGig.id, req.body.skills);
    await addGigLanguages(newGig.id, req.body.languages);
    await addGigSuitability(newGig.id);

    await generateCandidateMatches(newGig.id);

    res.status(200).send(newGig);

    return;
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const findGigById = async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      return res.status(400).send({ erorr: "bad request" });
    }

    const gig = await getGigById(req.params.id as UUID);

    if (gig == null) {
      return res.status(404).send({ erorr: "Gig not found" });
    }

    return res.status(200).send(GigDTO.fromModel(gig));
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getGigMatches = async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      return res.status(400).send({ erorr: "bad request" });
    }

    const gigMatches = await getGigSuitableUsers(req.params.id);

    return res.status(200).send(UserMatchDTO.fromModel(gigMatches));
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const fetchPaginatedGigs = async (req: Request, res: Response) => {
  try {
    const page =
      typeof req.query.page != "undefined"
        ? parseInt(req.query.page as string)
        : 0;

    const gigs = await getPaginatedGigs(page);

    if (gigs == null) {
      return res.status(404).send({ erorr: "Gigs not found" });
    }

    return res
      .status(200)
      .send({ gigs: gigs.rows, hasMore: gigs.rows.length < gigs.count });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const chatWithGigCreatorAssistant = async (
  req: Request,
  res: Response
) => {
  try {
    const messages = req.body.messages;
    const response = await getGigCreatorAssistantReply(messages);
    return res.status(200).send(response);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const summarizeGigFromConversation = async (
  req: Request,
  res: Response
) => {
  try {
    const messages = req.body.messages;
    const gig = await generateGigFromConversation(messages);
    return res.status(200).send(gig);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  addGig as createGig,
  findGigById as getGigById,
  fetchPaginatedGigs as getPaginatedGigs,
  getGigMatches,
};
