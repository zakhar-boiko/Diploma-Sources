import { Request, Response } from "express-serve-static-core";
import {
  addExperience,
  getFilteredCandidates,
  updatePersonalDetails,
  updateProfile,
  updateProfileLanguages,
  updateProfileSkills,
  uploadAvatar,
} from "../../controllers/UserController";
import { decodeToken } from "../../services/AuthService";
import {
  filterConsultants,
  findById,
  updateClientProfile,
  updateConsultantProfile,
  updateUserData,
} from "../../repositories/UserRepository";
import {
  generateCandidateMatches,
  generateGigMatches,
  getEmbeddings,
} from "../../services/MatchingService";
import {
  addUserSkills,
  deleteUserSkills,
} from "../../repositories/ProfileSkillsRepository";
import {
  addUserLanguages,
  deleteUserLanguages,
} from "../../repositories/ProfileLanguagesRepository";
import { addUserExperience } from "../../repositories/ProfileExperiencesRepository";
import CandidateProfileDTO from "../../dtos/CandidateProfileDTO";
import { TypedRequestBody } from "../../types/RequestTypes";
import { FileType } from "../../types/UserTypes";
import { uploadFile } from "../../services/FilesService";
import { Readable, Stream } from "stream";

jest.mock("../../services/AuthService");
jest.mock("../../repositories/UserRepository");
jest.mock("../../repositories/ProfileLanguagesRepository");
jest.mock("../../repositories/ProfileSkillsRepository");
jest.mock("../../repositories/ProfileExperiencesRepository");
jest.mock("../../services/MatchingService");
jest.mock("../../services/FilesService");
jest.mock("../../dtos/CandidateProfileDTO");

describe("UserController", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;
  let sendMock: jest.Mock;

  beforeEach(() => {
    statusMock = jest.fn().mockReturnThis();
    jsonMock = jest.fn();
    sendMock = jest.fn();
    req = {
      header: jest.fn(),
      body: {},
    };
    res = {
      status: statusMock,
      json: jsonMock,
      send: sendMock,
    };
  });

  describe("updateProfile", () => {
    test("returns status 400 if token is invalid", async () => {
      (decodeToken as jest.Mock).mockReturnValue(null);
      req.header = jest.fn().mockReturnValue("123445345");

      await updateProfile(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(sendMock).toHaveBeenCalledWith({ erorr: "Invalid token" });
    });

    test("returns 404 if user is not found", async () => {
      (decodeToken as jest.Mock).mockReturnValue("123432432132");
      (findById as jest.Mock).mockResolvedValue(null);
      req.header = jest
        .fn()
        .mockReturnValue(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyZDY3ZmFmZC0zMWNiLTQ4YjAtYjZkZS1iNDZlNzU5ZWQ4YTciLCJpYXQiOjE3MTQ4MTIzMDV9.zfLi7X2gu7dubOd1AWwXCfpDdww7jDYWMI6REOYarko"
        );

      await updateProfile(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(sendMock).toHaveBeenCalledWith({ erorr: "User not found" });
    });

    test("returns 200 and updates candidate profile", async () => {
      const mockUser = {
        id: "11577cb6-1187-4931-b780-893066106634",
        accountType: "CONSULTANT",
      };
      const updatedUser = { ...mockUser, firstName: "Loiko" };
      (decodeToken as jest.Mock).mockReturnValue(
        "11577cb6-1187-4931-b780-893066106634"
      );
      (findById as jest.Mock).mockResolvedValue(mockUser);
      (updateConsultantProfile as jest.Mock).mockResolvedValue(updatedUser);
      req.header = jest
        .fn()
        .mockReturnValue(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyZDY3ZmFmZC0zMWNiLTQ4YjAtYjZkZS1iNDZlNzU5ZWQ4YTciLCJpYXQiOjE3MTQ4MTIzMDV9.zfLi7X2gu7dubOd1AWwXCfpDdww7jDYWMI6REOYarko"
        );
      req.body = { firstName: "Loiko" };

      await updateProfile(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(sendMock).toHaveBeenCalledWith(updatedUser);
    });

    test("returns 200 and updates recruiter profile", async () => {
      const mockUser = {
        id: "11577cb6-1187-4931-b780-893066106634",
        accountType: "CLIENT",
      };
      const updatedUser = { ...mockUser, company: "Goolge" };
      (decodeToken as jest.Mock).mockReturnValue(
        "11577cb6-1187-4931-b780-893066106634"
      );
      (findById as jest.Mock).mockResolvedValue(mockUser);
      (updateClientProfile as jest.Mock).mockResolvedValue(updatedUser);
      req.header = jest
        .fn()
        .mockReturnValue(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyZDY3ZmFmZC0zMWNiLTQ4YjAtYjZkZS1iNDZlNzU5ZWQ4YTciLCJpYXQiOjE3MTQ4MTIzMDV9.zfLi7X2gu7dubOd1AWwXCfpDdww7jDYWMI6REOYarko"
        );
      req.body = { company: "Google" };

      await updateProfile(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(sendMock).toHaveBeenCalledWith(updatedUser);
    });

    test("returns 500 if an error occurs", async () => {
      const error = new Error("Error");
      (decodeToken as jest.Mock).mockImplementation(() => {
        throw error;
      });
      req.header = jest
        .fn()
        .mockReturnValue(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyZDY3ZmFmZC0zMWNiLTQ4YjAtYjZkZS1iNDZlNzU5ZWQ4YTciLCJpYXQiOjE3MTQ4MTIzMDV9.zfLi7X2gu7dubOd1AWwXCfpDdww7jDYWMI6REOYarko"
        );

      await updateProfile(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ error: "Internal Server Error" });
    });
  });

  describe("updatePersonalDetails", () => {
    test("returns 401 if restricted fields are updated", async () => {
      (decodeToken as jest.Mock).mockReturnValue(
        "11577cb6-1187-4931-b780-893066106634"
      );
      req.header = jest
        .fn()
        .mockReturnValue(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyZDY3ZmFmZC0zMWNiLTQ4YjAtYjZkZS1iNDZlNzU5ZWQ4YTciLCJpYXQiOjE3MTQ4MTIzMDV9.zfLi7X2gu7dubOd1AWwXCfpDdww7jDYWMI6REOYarko"
        );
      req.body = { email: "testmail@gmail.com" };

      await updatePersonalDetails(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(401);
      expect(jsonMock).toHaveBeenCalledWith({
        error: "Cannot update listed fields",
      });
    });

    test("returns 404 if user is not found", async () => {
      (decodeToken as jest.Mock).mockReturnValue(
        "11577cb6-1187-4931-b780-893066106635"
      );
      (updateUserData as jest.Mock).mockResolvedValue(null);
      req.header = jest
        .fn()
        .mockReturnValue("11577cb6-1187-4931-b780-893066106635");
      req.body = { firstName: "Nazar" };

      await updatePersonalDetails(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(sendMock).toHaveBeenCalledWith({ erorr: "User not found" });
    });

    test("returns 200 and updates user personal fields, matches are regenerated when description field is updated", async () => {
      const mockUser = {
        id: "11577cb6-1187-4931-b780-893066106634",
        accountType: "CONSULTANT",
        description: "Web developer",
      };
      const updatedUser = { ...mockUser, firstName: "Nazar" };
      const embeddings = [0.1, 0.2, 0.3];
      (decodeToken as jest.Mock).mockReturnValue(
        "11577cb6-1187-4931-b780-893066106634"
      );
      (updateUserData as jest.Mock).mockResolvedValue(updatedUser);
      (getEmbeddings as jest.Mock).mockResolvedValue(embeddings);
      req.header = jest
        .fn()
        .mockReturnValue(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyZDY3ZmFmZC0zMWNiLTQ4YjAtYjZkZS1iNDZlNzU5ZWQ4YTciLCJpYXQiOjE3MTQ4MTIzMDV9.zfLi7X2gu7dubOd1AWwXCfpDdww7jDYWMI6REOYarko"
        );
      req.body = { firstName: "Nazar", description: "Web developer" };

      await updatePersonalDetails(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(sendMock).toHaveBeenCalledWith(updatedUser);
      expect(updateConsultantProfile).toHaveBeenCalledWith(
        "11577cb6-1187-4931-b780-893066106634",
        {
          vector: embeddings,
        }
      );
      expect(generateGigMatches).toHaveBeenCalledWith(
        "11577cb6-1187-4931-b780-893066106634"
      );
    });

    test("returns 500 if an error occurs", async () => {
      const error = new Error("Test error");
      (decodeToken as jest.Mock).mockImplementation(() => {
        throw error;
      });
      req.header = jest
        .fn()
        .mockReturnValue(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyZDY3ZmFmZC0zMWNiLTQ4YjAtYjZkZS1iNDZlNzU5ZWQ4YTciLCJpYXQiOjE3MTQ4MTIzMDV9.zfLi7X2gu7dubOd1AWwXCfpDdww7jDYWMI6REOYarko"
        );

      await updatePersonalDetails(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ error: "Internal Server Error" });
    });
  });

  describe("updateProfileSkills", () => {
    beforeEach(() => {
      (deleteUserSkills as jest.Mock).mockResolvedValue(undefined);
      (addUserSkills as jest.Mock).mockResolvedValue(["1", "2"]);
    });

    test("returns 200, updates skills and generates matches for user", async () => {
      (decodeToken as jest.Mock).mockReturnValue(
        "11577cb6-1187-4931-b780-893066106634"
      );
      req.header = jest
        .fn()
        .mockReturnValue(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyZDY3ZmFmZC0zMWNiLTQ4YjAtYjZkZS1iNDZlNzU5ZWQ4YTciLCJpYXQiOjE3MTQ4MTIzMDV9.zfLi7X2gu7dubOd1AWwXCfpDdww7jDYWMI6REOYarko"
        );
      req.body = ["1", "2"];

      await updateProfileSkills(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(sendMock).toHaveBeenCalledWith(["1", "2"]);
      expect(deleteUserSkills).toHaveBeenCalledWith(
        "11577cb6-1187-4931-b780-893066106634"
      );
      expect(addUserSkills).toHaveBeenCalledWith(
        "11577cb6-1187-4931-b780-893066106634",
        ["1", "2"]
      );
      expect(generateGigMatches).toHaveBeenCalledWith(
        "11577cb6-1187-4931-b780-893066106634"
      );
    });

    test("returns 500 if an error occurs", async () => {
      const error = new Error("Test error");
      (decodeToken as jest.Mock).mockImplementation(() => {
        throw error;
      });
      req.header = jest
        .fn()
        .mockReturnValue(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyZDY3ZmFmZC0zMWNiLTQ4YjAtYjZkZS1iNDZlNzU5ZWQ4YTciLCJpYXQiOjE3MTQ4MTIzMDV9.zfLi7X2gu7dubOd1AWwXCfpDdww7jDYWMI6REOYarko"
        );

      await updateProfileSkills(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ error: "Internal Server Error" });
    });
  });

  describe("updateProfileLanguages", () => {
    beforeEach(() => {
      (deleteUserLanguages as jest.Mock).mockResolvedValue(undefined);
      (addUserLanguages as jest.Mock).mockResolvedValue(["1", "2"]);
    });

    test("returns 200 and update languages", async () => {
      (decodeToken as jest.Mock).mockReturnValue(
        "11577cb6-1187-4931-b780-893066106634"
      );
      req.header = jest
        .fn()
        .mockReturnValue(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyZDY3ZmFmZC0zMWNiLTQ4YjAtYjZkZS1iNDZlNzU5ZWQ4YTciLCJpYXQiOjE3MTQ4MTIzMDV9.zfLi7X2gu7dubOd1AWwXCfpDdww7jDYWMI6REOYarko"
        );
      req.body = ["1", "2"];

      await updateProfileLanguages(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(sendMock).toHaveBeenCalledWith(["1", "2"]);
      expect(deleteUserLanguages).toHaveBeenCalledWith(
        "11577cb6-1187-4931-b780-893066106634"
      );
      expect(addUserLanguages).toHaveBeenCalledWith(
        "11577cb6-1187-4931-b780-893066106634",
        ["1", "2"]
      );
    });

    test("returns 500 if an error occurs", async () => {
      const error = new Error("Test error");
      (decodeToken as jest.Mock).mockImplementation(() => {
        throw error;
      });
      req.header = jest
        .fn()
        .mockReturnValue(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyZDY3ZmFmZC0zMWNiLTQ4YjAtYjZkZS1iNDZlNzU5ZWQ4YTciLCJpYXQiOjE3MTQ4MTIzMDV9.zfLi7X2gu7dubOd1AWwXCfpDdww7jDYWMI6REOYarko"
        );
      await updateProfileLanguages(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ error: "Internal Server Error" });
    });
  });

  describe("addExperience", () => {
    test("returns 200 and adds experience", async () => {
      (decodeToken as jest.Mock).mockReturnValue(
        "11577cb6-1187-4931-b780-893066106634"
      );
      req.header = jest
        .fn()
        .mockReturnValue(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyZDY3ZmFmZC0zMWNiLTQ4YjAtYjZkZS1iNDZlNzU5ZWQ4YTciLCJpYXQiOjE3MTQ4MTIzMDV9.zfLi7X2gu7dubOd1AWwXCfpDdww7jDYWMI6REOYarko"
        );

      const date = new Date();
      req.body = {
        title: "Developer",
        description: "Developed",
        company: "Beleven",
        startDate: date,
        isActive: true,
      };

      (addUserExperience as jest.Mock).mockResolvedValue({
        title: "Developer",
        description: "Developed",
        company: "Beleven",
        startDate: date,
        isActive: true,
      });

      await addExperience(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(sendMock).toHaveBeenCalledWith({
        title: "Developer",
        description: "Developed",
        company: "Beleven",
        startDate: date,
        isActive: true,
      });
      expect(addUserExperience).toHaveBeenCalledWith(
        "11577cb6-1187-4931-b780-893066106634",
        req.body
      );
    });

    test("returns 500 if an error occurs", async () => {
      const error = new Error("Test");
      (decodeToken as jest.Mock).mockImplementation(() => {
        throw error;
      });
      req.header = jest
        .fn()
        .mockReturnValue(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyZDY3ZmFmZC0zMWNiLTQ4YjAtYjZkZS1iNDZlNzU5ZWQ4YTciLCJpYXQiOjE3MTQ4MTIzMDV9.zfLi7X2gu7dubOd1AWwXCfpDdww7jDYWMI6REOYarko"
        );

      await addExperience(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ error: "Internal Server Error" });
    });
  });

  describe("getFilteredCandidates", () => {
    test("returns a list of filtered candidates with valid query parameters", async () => {
      req.query = {
        languages: "English,Ukrainian",
        skills: "JavaScript,NodeJs",
        profileLevel: "MIDDLE,SENIOR",
        page: "1",
      };

      const mockCandidates = {
        rows: [
          {
            id: "11577cb6-1187-4931-b780-893066106634",
            name: "Zakhar Boiko",
            skills: ["JavaScript"],
            languages: ["Ukrainian"],
          },
          {
            id: "54c7c16a-75f5-4bd4-8804-526e82b8c708",
            name: "Test Account",
            skills: ["NodeJs"],
            languages: ["English"],
          },
        ],
        count: 2,
      };

      (filterConsultants as jest.Mock).mockResolvedValue(mockCandidates);
      (CandidateProfileDTO.fromModel as jest.Mock).mockImplementation(
        (candidate) => candidate
      );

      await getFilteredCandidates(req as Request, res as Response);

      expect(filterConsultants).toHaveBeenCalledWith({
        languages: ["English", "Ukrainian"],
        skills: ["JavaScript", "NodeJs"],
        profileLevel: ["MIDDLE", "SENIOR"],
        page: 1,
      });
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(sendMock).toHaveBeenCalledWith({
        candidates: mockCandidates.rows,
        hasMore: false,
      });
    });

    test("returns unfiltered candidates with missing or invalid query parameters", async () => {
      req.query = {};

      const mockCandidates = {
        rows: [
          {
            id: "11577cb6-1187-4931-b780-893066106634",
            name: "Zakhar Boiko",
            skills: ["JavaScript"],
            languages: ["Ukrainian"],
          },
          {
            id: "54c7c16a-75f5-4bd4-8804-526e82b8c708",
            name: "Test Account",
            skills: ["NodeJs"],
            languages: ["English"],
          },
          {
            id: "2d67fafd-31cb-48b0-b6de-b46e759ed8a7",
            name: "Nazar Loiko",
            skills: [],
            languages: [],
          },
        ],
        count: 3,
      };

      (filterConsultants as jest.Mock).mockResolvedValue(mockCandidates);
      (CandidateProfileDTO.fromModel as jest.Mock).mockImplementation(
        (candidate) => candidate
      );

      await getFilteredCandidates(req as Request, res as Response);

      expect(filterConsultants).toHaveBeenCalledWith({
        languages: [],
        profileLevel: [],
        skills: [],
        page: 0,
      });
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(sendMock).toHaveBeenCalledWith({
        candidates: mockCandidates.rows,
        hasMore: false,
      });
    });

    test("returns 500 if an error occurs", async () => {
      const error = new Error("Test error");
      (filterConsultants as jest.Mock).mockImplementation(() => {
        throw error;
      });

      await getFilteredCandidates(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ error: "Internal Server Error" });
    });
  });

  describe("uploadAvatar", () => {
    test("returns 400 if no file is uploaded", async () => {
      (decodeToken as jest.Mock).mockReturnValue(
        "11577cb6-1187-4931-b780-893066106634"
      );
      req.header = jest
        .fn()
        .mockReturnValue(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyZDY3ZmFmZC0zMWNiLTQ4YjAtYjZkZS1iNDZlNzU5ZWQ4YTciLCJpYXQiOjE3MTQ4MTIzMDV9.zfLi7X2gu7dubOd1AWwXCfpDdww7jDYWMI6REOYarko"
        );

      await uploadAvatar(req as TypedRequestBody<FileType>, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ error: "No file uploaded" });
    });

    test("returns 200, uploads the file and updates user avatarUrl field", async () => {
      const userId = "11577cb6-1187-4931-b780-893066106634";
      const file = {
        originalname: "avatar.png",
        path: "path/to/avatar.png",
        mimetype: "png",
        filename: "avatar.png",
        destination: "/images/avatar.png",
        fieldname: "",
        size: 10,
        encoding: "",
        buffer: Buffer.from(""),
        stream: new Readable(),
      };
      const downloadURL = ["https://storage.com/avatar.png"];

      (decodeToken as jest.Mock).mockReturnValue(userId);
      req.header = jest
        .fn()
        .mockReturnValue(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyZDY3ZmFmZC0zMWNiLTQ4YjAtYjZkZS1iNDZlNzU5ZWQ4YTciLCJpYXQiOjE3MTQ4MTIzMDV9.zfLi7X2gu7dubOd1AWwXCfpDdww7jDYWMI6REOYarko"
        );
      req.file = file;

      (uploadFile as jest.Mock).mockImplementation((file, options) => {
        options.onUpload(downloadURL);
      });

      const updatedUser = { id: userId, avatarUrl: downloadURL[0] };
      (updateUserData as jest.Mock).mockResolvedValue(updatedUser);

      await uploadAvatar(req as TypedRequestBody<FileType>, res as Response);

      expect(uploadFile).toHaveBeenCalledWith(file, expect.any(Object));
      expect(updateUserData).toHaveBeenCalledWith(userId, {
        avatarUrl: downloadURL[0],
      });
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(updatedUser);
    });

    test("returns 500 if an error occurs during upload", async () => {
      (decodeToken as jest.Mock).mockReturnValue(
        "11577cb6-1187-4931-b780-893066106634"
      );
      req.header = jest
        .fn()
        .mockReturnValue(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyZDY3ZmFmZC0zMWNiLTQ4YjAtYjZkZS1iNDZlNzU5ZWQ4YTciLCJpYXQiOjE3MTQ4MTIzMDV9.zfLi7X2gu7dubOd1AWwXCfpDdww7jDYWMI6REOYarko"
        );
      req.file = {
        originalname: "avatar.png",
        path: "path/to/avatar.png",
        mimetype: "png",
        filename: "avatar.png",
        destination: "/images/avatar.png",
        fieldname: "",
        size: 10,
        encoding: "",
        buffer: Buffer.from(""),
        stream: new Readable(),
      };

      const error = new Error("Error");
      (uploadFile as jest.Mock).mockRejectedValue(error);

      await uploadAvatar(req as TypedRequestBody<FileType>, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        error: "An error occurred while uploading the file",
      });
    });
  });
});
