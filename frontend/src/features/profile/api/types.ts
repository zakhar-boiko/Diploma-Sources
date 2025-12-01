import { AccountType, ProfileLevel, SkillCategory } from "./enums/enums";

export interface UserType {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  title?: string;
  accountType?: AccountType;
  mobileNumber?: string;
  avatarUrl?: string;
  description?: string;
}

export interface ConsultantType extends UserType {
  profileLevel?: ProfileLevel;
  skills?: SkillType[];
  languages?: LanguageType[];
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
  id?: string;

  title: string;

  company: string;

  description: string;

  isActive: boolean;

  startDate: string;

  endDate: string;
}


export interface SkillType {
  id: string;

  name: string;

  categoryName: SkillCategory;
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

