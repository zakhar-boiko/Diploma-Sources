import { LanguageBridgeType, SkillBridgeType } from "./UserTypes";
import { ProfileLevel } from "./enums/UserEnums";

export interface GigType {
  id: string;

  creatorId: string;

  title: string;

  profileLevel: ProfileLevel;

  skills: GigSkillType[];

  languages: GigLanguageType[];

  description: string;

  gigVector?: number[];

  publicationDate: Date;
}

export interface GigRequestType {
  id: string;

  creatorId: string;

  title: string;

  profileLevel: ProfileLevel;

  skills: string[];

  languages: string[];

  description: string;

  publicationDate: Date;

  gigVector?: number[];
}

export interface GigSkillType extends SkillBridgeType {
  id: string;
  gigId: string;
  skillId: string;
}

export interface GigLanguageType extends LanguageBridgeType {
  id: string;
  gigId: string;
  languageId: string;
}


export interface GigLanguageType {
  id: string;
  languageId: string;
  gigId: string;
}
