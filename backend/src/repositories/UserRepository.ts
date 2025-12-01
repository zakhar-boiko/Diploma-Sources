import { Recruiter } from "../models/Recruiter";
import { Candidate } from "../models/Candidate";
import User from "../models/User";
import {
  CandidateFullProfile,
  ClientType,
  ConsultantType,
  FilterOptions,
  UserType,
} from "../types/UserTypes";
import { AccountType } from "../types/enums/UserEnums";
import { Experience } from "../models/Experience";
import { Language } from "../models/Language";
import { Skill } from "../models/Skill";
import { UserSkill } from "../models/UserSkill";
import { UserLanguage } from "../models/UserLanguage";
import CandidateProfileDTO from "../dtos/CandidateProfileDTO";
import { Includeable, Op, col, fn, literal } from "sequelize";
import { UserSuitability } from "../models/UserSuitability";

const createUser = async (
  user: ClientType | ConsultantType
): Promise<UserType> => {
  const createdUser = await User.create({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
    title: user.title,
    accountType: user.accountType,
    mobileNumber: user.mobileNumber,
  });

  if (user.accountType == AccountType.CONSULTANT) {
    const consultantData = user as ConsultantType;
    await Candidate.create({
      id: createdUser.id,
      userId: createdUser.id,
      profileLevel: consultantData.profileLevel,
    });

    await UserSuitability.create({
      id: createdUser.id,
      userId: createdUser.id,
    });
  } else {
    const clientData = user as ClientType;
    await Recruiter.create({
      id: createdUser.id,
      userId: createdUser.id,
      businessArea: clientData.businessArea,
      company: clientData.company,
      numberOfEmployees: clientData.numberOfEmployees,
    });
  }

  return createdUser;
};

const findByEmail = async (email: string): Promise<UserType | null> => {
  const user = await User.findOne({ where: { email } });

  return user;
};

const findById = async (userId: string): Promise<UserType | null> => {
  const user = await User.findByPk(userId);

  return user;
};

const findCandidateById = async (
  userId: string
): Promise<ConsultantType | null> => {
  const user = await Candidate.findByPk(userId, {
    include: [
      { model: UserLanguage, attributes: ["languageId", "id", "userId"] },
      { model: UserSkill, attributes: ["skillId", "id", "userId"] },
      {
        model: User,
        attributes: ["firstName", "lastName", "email", "title", "description"],
      },
    ],
    attributes: {
      exclude: ["skillsVector", "vector"],
    },
  });

  if (user) {
    const data = user.dataValues;
    const candidate = {
      ...data,
      ...data.user.dataValues,
    };
    delete candidate.user;
    return candidate;
  }

  return null;
};

const findFullUserProfileById = async (
  userId: string
): Promise<UserType | null> => {
  const user = await User.findByPk(userId);

  if (!user) return null;
  const accountType = user.accountType;

  await user.reload({
    include: {
      model: accountType === AccountType.CONSULTANT ? Candidate : Recruiter,
      include:
        accountType === AccountType.CONSULTANT
          ? [
              {
                model: UserSkill,
                attributes: ["id"],
                include: [
                  {
                    model: Skill,
                    attributes: ["id", "name", "categoryName"],
                  },
                ],
              },
              {
                model: UserLanguage,
                attributes: ["id"],
                include: [
                  {
                    model: Language,
                    attributes: ["id", "name"],
                  },
                ],
              },
              Experience,
            ]
          : [],
    },
  });

  let userData = user.toJSON();

  if (accountType === AccountType.CONSULTANT && user.consultant) {
    userData = CandidateProfileDTO.fromModel({
      ...userData,
      ...user.consultant.toJSON(),
    });
  } else if (accountType === AccountType.CLIENT && user.client) {
    userData = {
      ...userData,
      ...user.client.toJSON(),
    };
  }
  return userData;
};

const updateUserData = async (
  userId: string,
  profileData: Partial<UserType>
): Promise<UserType | null> => {
  try {
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error("User not found");
    }

    const updatedUser = await user.update(profileData, { returning: true });
    return updatedUser;
  } catch (error) {
    console.error("Error updating consultant profile:", error);
    return null;
  }
};

const updateConsultantProfile = async (
  userId: string,
  profileData: Partial<ConsultantType>
): Promise<Candidate | null> => {
  try {
    const consultant = await Candidate.findOne({ where: { id: userId } });
    if (!consultant) {
      throw new Error("Consultant not found");
    }

    const updatedUser = await consultant.update(profileData);
    return updatedUser;
  } catch (error) {
    console.error("Error updating consultant profile:", error);
    return null;
  }
};

const updateClientProfile = async (
  userId: string,
  profileData: Partial<ClientType>
): Promise<Recruiter | null> => {
  try {
    const client = await Recruiter.findOne({ where: { userId } });
    if (!client) {
      throw new Error("Client not found");
    }

    const updatedUser = await client.update(profileData);
    return updatedUser;
  } catch (error) {
    console.error("Error updating client profile:", error);
    return null;
  }
};

const filterConsultants = async (
  options: FilterOptions
): Promise<{ count: number; rows: CandidateFullProfile[] }> => {
  let { skills, languages, profileLevel, page } = options;

  let include: Array<Includeable> = [];

  skills.length &&
    include.push({
      model: UserSkill,

      where: {
        skillId: skills,
      },
      include: [
        {
          model: Skill,
          attributes: ["name", "id", "categoryName"],
        },
      ],
      required: true,
      duplicating: false,
    });

  languages.length &&
    include.push({
      model: UserLanguage,
      where: {
        languageId: languages,
      },
      include: [{ model: Language, attributes: ["name", "id"] }],
      required: true,
      duplicating: false,
    });

  const candidates = await User.findAndCountAll({
    include: [
      {
        model: Candidate,
        where: profileLevel.length
          ? {
              profileLevel: profileLevel,
            }
          : undefined,
        attributes: {
          exclude: ["vector"],
        },
        include,
        right: true,
        required: true,
        duplicating: false,
      },
    ],

    attributes: {
      include: [
        [
          skills.length
            ? literal(`(
              SELECT COUNT(*)
              FROM user_skills AS skills
              WHERE
              skills."userId" = "User"."id"
              AND
              skills."skillId" IN (${skills
                .map((skill) => `'${skill}'`)
                .join(", ")})
            )`)
            : literal("0"),
          "skillscount",
        ],
      ],
    },

    order: [["skillscount", "DESC"]],

    limit: ((page ?? 0) + 1) * 5,
  });

  return candidates;
};

const findAllCandidatesWithDescriptionOrSkills = async (
  omitCandidateIds: string[] = []
): Promise<ConsultantType[]> => {
  const candidates = await Candidate.findAll({
    include: [
      { model: UserSkill, attributes: ["skillId", "id", "userId"] },
      { model: UserLanguage, attributes: ["languageId", "id", "userId"] },
      {
        model: User,
        attributes: [], // Prevent nested user, since we're lifting fields to top
        required: false,
      },
    ],
    attributes: {
      exclude: ["skillsVector", "vector"],
      include: [
        [literal(`"user"."description"`), "description"],
        [literal(`"user"."title"`), "title"],
      ],
    },
    where: {
      [Op.or]: [
        literal(
          `EXISTS (SELECT 1 FROM "user_skills" WHERE "user_skills"."userId" = "Candidate"."id")`
        ),
        { vector: { [Op.not]: null } },
      ],
      id: { [Op.notIn]: omitCandidateIds },
    },
  });
  return candidates;
};

export {
  findAllCandidatesWithDescriptionOrSkills,
  filterConsultants,
  findByEmail,
  findById,
  findCandidateById,
  findFullUserProfileById,
  updateClientProfile,
  updateConsultantProfile,
  updateUserData,
  createUser,
};
