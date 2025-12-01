import { UUID } from "crypto";
import { AccountType, ProfileLevel, SkillCategory } from "./enums/UserEnums";

export interface UserType {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  title?: string;
  accountType?: AccountType;
  mobileNumber?: string;
  avatarUrl?: string;
  description?: string;
}

export interface ConsultantType extends UserType {
  profileLevel?: ProfileLevel;
  skills?: UserSkillType[];
  skillsVector?: number[];
  vector?: number[];
  languages?: UserLanguageType[];
  experiences?: ExperienceType[];
  cvUrl?: string;
  userId?: string;
}

export interface ClientType extends UserType {
  id?: string;
  businessArea: string;
  company: string;
  numberOfEmployees: number;
}

export interface SignedTokenType {
  userId: string;
}

export interface LanguageType {
  id: string;

  name: string;
}

export interface ExperienceType {
  id: string;

  title: string;

  company: string;

  description: string;

  isActive: boolean;

  userId: string;

  startDate: Date;

  endDate: Date;
}

export interface UserSkillType {
  id: string;
  userId: string;
  skillId: string;
}

export interface UserLanguageType {
  id: string;
  userId: string;
  languageId: string;
}

export interface SkillType {
  id: string;

  name: string;

  categoryName: SkillCategory;
}

export interface SkillBridgeType {
  skill: SkillType;
}

export interface LanguageBridgeType {
  language: LanguageType;
}

export interface FilteredConsultantsRequest {
  skills?: string;
  languages?: string;
  profileLevel?: string;
  page?: number;
}

export interface FilterOptions {
  skills: string[];
  languages: string[];
  profileLevel: string[];
  page: number;
}

export interface FileType {
  file: File;
  folder: string;
}

export type CandidateType = {
  profileLevel?: ProfileLevel;
  skills?: SkillBridgeType[];
  skillsVector?: number[];
  vector?: number[];
  languages?: LanguageBridgeType[];
  experiences?: ExperienceType[];
  cvUrl?: string;
  userId?: string;
}

export type CandidateFullProfile = UserType & {
  consultant: CandidateType;
};
