import { User } from "../models/User";
import jwt from "jsonwebtoken";
import {
  ClientType,
  ConsultantType,
  ExperienceType,
  FileType,
  FilterOptions,
  SignedTokenType,
  UserType,
} from "../types/UserTypes";
import { TypedRequestBody } from "../types/RequestTypes";
import {
  generateCandidateMatches,
  generateGigMatches,
  getEmbeddings,
} from "../services/MatchingService";
import { Request, Response } from "express-serve-static-core";
import { uploadFile } from "../services/FilesService";
import CandidateProfileDTO from "../dtos/CandidateProfileDTO";
import { getGigSuitableGigs } from "../repositories/UserSuitabilityRepository";
import GigMatchDTO from "../dtos/GigMatchDTO";
import {
  filterConsultants,
  findById,
  findFullUserProfileById,
  updateClientProfile,
  updateConsultantProfile,
  updateUserData,
} from "../repositories/UserRepository";
import { decodeToken } from "../services/AuthService";
import {
  addUserSkills,
  deleteUserSkills,
} from "../repositories/ProfileSkillsRepository";
import {
  addUserLanguages,
  deleteUserLanguages,
} from "../repositories/ProfileLanguagesRepository";
import {
  addUserExperience,
  deleteUserExperience,
  updateUserExperience,
} from "../repositories/ProfileExperiencesRepository";
import { getAllGigsByCreatorId } from "../repositories/GigRepository";
import { askGroq } from "../services/GroqService";
import {
  extractResumeData,
  extractUserLanguages,
  extractUserSkills,
} from "../services/ResumeDataExtractorService";
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const todos = await User.findAll();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const user = await findFullUserProfileById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).send(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getMyProfile = async (req: Request, res: Response) => {
  try {
    const token = req.header("Authorization");

    const userId = decodeToken(token as string);

    if (!userId) {
      return res.status(400).send({ erorr: "Invalid token" });
    }

    const user = await findFullUserProfileById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).send(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updatePersonalDetails = async (
  req: TypedRequestBody<Partial<UserType>>,
  res: Response
) => {
  try {
    const token = req.header("Authorization");

    const userId = decodeToken(token as string);

    if (!userId) {
      return res.status(400).send({ erorr: "Invalid token" });
    } else if (
      "email" in req.body ||
      "password" in req.body ||
      "accountType" in req.body
    ) {
      return res.status(401).json({ error: "Cannot update listed fields" });
    }

    const user = await updateUserData(userId, req.body);

    if (user == null) {
      return res.status(404).send({ erorr: "User not found" });
    }

    res.status(200).send(user);

    if (
      user.accountType == "CONSULTANT" &&
      typeof req.body.description !== "undefined"
    ) {
      const descriptionEmbeddings = await getEmbeddings(req.body.description);
      await updateConsultantProfile(userId, {
        vector: descriptionEmbeddings,
      });
      await generateGigMatches(userId);
    }

    return;
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateProfile = async (
  req: TypedRequestBody<Partial<ConsultantType> | Partial<ClientType>>,
  res: Response
) => {
  try {
    const token = req.header("Authorization");

    const userId = decodeToken(token as string);

    if (!userId) {
      return res.status(400).send({ erorr: "Invalid token" });
    }

    const user = await findById(userId);

    if (user == null) {
      return res.status(404).send({ erorr: "User not found" });
    }

    const updatedUser =
      user.accountType == "CONSULTANT"
        ? await updateConsultantProfile(userId, req.body)
        : await updateClientProfile(userId, req.body);

    return res.status(200).send(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateProfileSkills = async (
  req: TypedRequestBody<string[]>,
  res: Response
) => {
  try {
    const token = req.header("Authorization");

    const userId = decodeToken(token as string);

    if (!userId) {
      return res.status(400).send({ erorr: "Invalid token" });
    }

    await deleteUserSkills(userId);

    const updatedSkills = await addUserSkills(userId, req.body);

    res.status(200).send(updatedSkills);

    await generateGigMatches(userId);
    return;
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateProfileLanguages = async (
  req: TypedRequestBody<string[]>,
  res: Response
) => {
  try {
    const token = req.header("Authorization");

    const userId = decodeToken(token as string);

    if (!userId) {
      return res.status(400).send({ erorr: "Invalid token" });
    }

    await deleteUserLanguages(userId);

    const updatedLanguages = await addUserLanguages(userId, req.body);

    return res.status(200).send(updatedLanguages);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addExperience = async (
  req: TypedRequestBody<ExperienceType>,
  res: Response
) => {
  try {
    const token = req.header("Authorization");

    const userId = decodeToken(token as string);

    if (!userId) {
      return res.status(400).send({ erorr: "Invalid token" });
    }

    const createdExperience = await addUserExperience(userId, req.body);

    return res.status(200).send(createdExperience);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateExperience = async (
  req: TypedRequestBody<ExperienceType>,
  res: Response
) => {
  try {
    const token = req.header("Authorization");

    const userId = decodeToken(token as string);

    if (!userId) {
      return res.status(400).send({ erorr: "Invalid token" });
    }

    const updatedExperience = await updateUserExperience(req.body);

    return res.status(200).send(updatedExperience);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteExperience = async (
  req: TypedRequestBody<ExperienceType>,
  res: Response
) => {
  try {
    const token = req.header("Authorization");

    const userId = decodeToken(token as string);

    if (!userId) {
      return res.status(400).send({ erorr: "Invalid token" });
    }

    await deleteUserExperience(req.params.id);

    return res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getFilteredCandidates = async (req: Request, res: Response) => {
  try {
    const filters: FilterOptions = {
      languages:
        typeof req.query.languages == "string"
          ? req.query.languages.split(",")
          : [],
      skills:
        typeof req.query.skills == "string" ? req.query.skills.split(",") : [],
      profileLevel:
        typeof req.query.profileLevel == "string"
          ? req.query.profileLevel.split(",")
          : [],
      page:
        typeof req.query.page != "undefined"
          ? parseInt(req.query.page as string)
          : 0,
    };

    const candidates = await filterConsultants(filters);

    const filteredCandidates = candidates.rows.map((candidate) =>
      CandidateProfileDTO.fromModel(candidate)
    );

    const hasMore = filteredCandidates.length < candidates.count;

    return res.status(200).send({
      candidates: filteredCandidates,
      hasMore: hasMore,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const uploadAvatar = async (req: TypedRequestBody<FileType>, res: Response) => {
  try {
    const token = req.header("Authorization");

    const userId = decodeToken(token as string);

    if (!userId) {
      return res.status(400).send({ erorr: "Invalid token" });
    }
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    const folder = "images";

    await uploadFile(req.file, {
      folder,
      onUpload: async (downloadURL: string[]) => {
        const updatedUser = await updateUserData(userId, {
          avatarUrl: downloadURL.at(0),
        });
        res.status(200).json(updatedUser);
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while uploading the file" });
  }
};

const uploadCv = async (req: TypedRequestBody<FileType>, res: Response) => {
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

    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    const folder = "files";

    await uploadFile(req.file, {
      folder,
      onUpload: async (downloadURL: string[]) => {
        await updateConsultantProfile(userId, {
          cvUrl: downloadURL.at(0),
        });
      },
    });

    const resumeData = await extractResumeData(req.file);

    if (resumeData.skills.length > 0) {
      const newSkills = await extractUserSkills(userId, resumeData.skills);
      await addUserSkills(userId, newSkills);
      await generateGigMatches(userId);
    }
    if (resumeData.languages.length > 0) {
      const newLanguages = await extractUserLanguages(
        userId,
        resumeData.languages
      );
      await addUserLanguages(userId, newLanguages);
    }
    if (resumeData.overview) {
      const descriptionEmbeddings = await getEmbeddings(resumeData.overview);
      await updateUserData(userId, {
        description: resumeData.overview,
      });
      await updateConsultantProfile(userId, {
        vector: descriptionEmbeddings,
      });
      await generateGigMatches(userId);
    }

    return res.status(200).json(resumeData);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while uploading the file" });
  }
};

const getCreatedGigs = async (req: Request, res: Response) => {
  try {
    const token = req.header("Authorization");

    const userId = decodeToken(token as string);

    if (!userId) {
      return res.status(400).send({ erorr: "Invalid token" });
    }

    const createdGigs = await getAllGigsByCreatorId(userId);

    return res.status(200).send(createdGigs);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching gigs" });
  }
};

const getUserMatches = async (req: Request, res: Response) => {
  try {
    const token = req.header("Authorization");

    const userId = decodeToken(token as string);

    if (!userId) {
      return res.status(400).send({ erorr: "Invalid token" });
    }

    const suitableGigs = await getGigSuitableGigs(userId);

    return res.status(200).send(GigMatchDTO.fromModel(suitableGigs));
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching gigs" });
  }
};

const askAi = async (req: Request, res: Response) => {
  try {
    const response = await generateCandidateMatches(
      "f4088e9d-6e0e-4444-b15a-fb488014c29b"
    );
    res.status(200).send(response);
  } catch (error) {
    console.error("Error asking AI:", error);
    res.status(500).json({ error: "An error occurred while asking Groq" });
  }
};

export {
  getAllUsers,
  getMyProfile,
  updatePersonalDetails,
  updateProfile,
  updateProfileSkills,
  getUserById,
  addExperience,
  deleteExperience,
  updateExperience,
  updateProfileLanguages,
  getFilteredCandidates,
  uploadAvatar,
  uploadCv,
  getCreatedGigs,
  getUserMatches,
  askAi,
};
