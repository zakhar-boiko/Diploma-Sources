import { ProfileLevel } from "../../profile/api/enums/enums";
import { LanguageType, SkillType } from "../../profile/api/types";

export interface GigType {
  id: string;

  creatorId: string;

  title: string;

  profileLevel: ProfileLevel;

  skills: SkillType[];

  languages: LanguageType[];

  description: string;

  publicationDate: string;
}

export type GigDataType = {
  creatorId?: string;

  title: string;

  profileLevel?: ProfileLevel;

  skills: string[];

  languages: string[];

  description: string;
};

export type PaginatedGigsResponse = {
  gigs: GigType[],
  hasMore: boolean,
}