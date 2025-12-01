import { UUID } from "crypto";
import { Gig } from "../models/Gig";
import { GigRequestType, GigType } from "../types/GigTypes";
import { GigLanguage } from "../models/GigLanguage";
import { GigSkill } from "../models/GigSkill";
import { Skill } from "../models/Skill";
import { Language } from "../models/Language";

const createGig = async (gig: GigRequestType): Promise<GigType> => {
  const newGig = await Gig.create({ ...gig });
  return newGig;
};

const getGigById = async (gigId: string): Promise<GigType | null> => {
  const gig = await Gig.findByPk(gigId, {
    include: [
      {
        model: GigLanguage,
        attributes: ["id", "languageId"],
        include: [{ model: Language, attributes: ["id", "name"] }],
      },
      {
        model: GigSkill,
        attributes: ["id", "skillId"],
        include: [{ model: Skill, attributes: ["id", "name", "categoryName"] }],
      },
    ],
    attributes: [
      "id",
      "title",
      "creatorId",
      "description",
      "profileLevel",
      "publicationDate",
      "gigVector",
    ],
  });
  return gig;
};

const getAllGigs = async (): Promise<GigType[]> => {
  const gigs = await Gig.findAll({
    include: [
      {
        model: GigLanguage,
        attributes: ["id", "languageId"],
        include: [{ model: Language, attributes: ["id", "name"] }],
      },
      {
        model: GigSkill,
        attributes: ["id", "skillId"],
        include: [{ model: Skill, attributes: ["id", "name", "categoryName"] }],
      },
    ],
  });

  return gigs;
};

const getPaginatedGigs = async (
  page: number
): Promise<{ count: number; rows: GigType[] } | null> => {
  const gigs = await Gig.findAndCountAll({
    limit: ((page ?? 0) + 1) * 3,
    attributes: {
      exclude: ["gigVector"],
    },
    order: [["publicationDate", "DESC"]],
  });

  return gigs;
};

const getAllGigsByCreatorId = async (creatorId: string): Promise<GigType[]> => {
  const gigs = await Gig.findAll({
    where: {
      creatorId: creatorId,
    },
  });
  return gigs;
};

export {
  getAllGigsByCreatorId,
  getPaginatedGigs,
  getAllGigs,
  getGigById,
  createGig,
};
