import { Response } from "express";
import jwt from "jsonwebtoken";
import { createGig, getGigById } from "../../controllers/GigController";
import {
  generateCandidateMatches,
  getEmbeddings,
} from "../../services/MatchingService";
import { addGigSkills } from "../../repositories/GigSkillsRepository";
import { addGigLanguages } from "../../repositories/GigLanguageRepository";
import { addGigSuitability } from "../../repositories/GigSuitabilityRepository";
import { SignedTokenType } from "../../types/UserTypes";

import {
  createGig as createGigInRepo,
  getGigById as getGigByIdFromRepo,
  getPaginatedGigs as getPaginatedGigsFromRepo,
} from "../../repositories/GigRepository";

// import { SignedTokenType } from '../path-to-types/types';

jest.mock("jsonwebtoken");
// jest.mock('.../../repositories/GigRepository');
jest.mock("../../repositories/GigRepository");
jest.mock("../../services/MatchingService");

describe("GigController", () => {
  let req: any;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;
  let sendMock: jest.Mock;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
      query: {},
      header: jest.fn(),
    };
    statusMock = jest.fn().mockReturnThis();
    jsonMock = jest.fn();
    sendMock = jest.fn();
    res = {
      status: statusMock,
      json: jsonMock,
      send: sendMock,
    };
  });

  describe("createGig", () => {
    test("should return 400 if token is invalid", async () => {
      req.header.mockReturnValue(null);

      await createGig(req, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(sendMock).toHaveBeenCalledWith({ erorr: "Invalid token" });
    });

    test("should create a gig and return it", async () => {
      const token = "valid-token";
      const userId = "user-id";
      const gig = {
        description: "Gig description",
        skills: ["skill1", "skill2"],
        languages: ["language1", "language2"],
      };

      req.header.mockReturnValue(token);
      (jwt.verify as jest.Mock).mockReturnValue({ userId } as SignedTokenType);
      req.body = gig;

      const gigId = "gig-id";
      const newGig = {
        ...gig,
        id: gigId,
        creatorId: userId,
        publicationDate: new Date(),
      };
      (getEmbeddings as jest.Mock).mockResolvedValue([1, 2, 3]);
      (createGigInRepo as jest.Mock).mockResolvedValue(newGig);

      await createGig(req, res as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(sendMock).toHaveBeenCalledWith(newGig);
      expect(addGigSkills).toHaveBeenCalledWith(gigId, gig.skills);
      expect(addGigLanguages).toHaveBeenCalledWith(gigId, gig.languages);
      expect(addGigSuitability).toHaveBeenCalledWith(gigId);
      expect(generateCandidateMatches).toHaveBeenCalledWith(gigId);
    });

    test("should return 500 if an error occurs", async () => {
      req.header.mockReturnValue("valid-token");
      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw new Error("Test error");
      });

      await createGig(req, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ error: "Internal Server Error" });
    });
  });

  describe("getGigById", () => {
    test("should return 400 if id is missing", async () => {
      await getGigById(req, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(sendMock).toHaveBeenCalledWith({ erorr: "bad request" });
    });

    test("should return 404 if gig is not found", async () => {
      req.params.id = "non-existent-id";
      (getGigById as jest.Mock).mockResolvedValue(null);

      await getGigById(req, res as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(sendMock).toHaveBeenCalledWith({ erorr: "Gig not found" });
    });
  });
});
