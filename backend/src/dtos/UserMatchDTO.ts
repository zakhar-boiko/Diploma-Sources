import { GigSuitability } from "../models/GigSuitability";
import {
  CandidateFullProfile,
  CandidateType,
  ConsultantType,
  ExperienceType,
  LanguageType,
  SkillType,
  UserType,
} from "../types/UserTypes";
import { AccountType, ProfileLevel } from "../types/enums/UserEnums";

type MatchModel = {
  suitableUsers: {
    user: CandidateType & {
      user: UserType;
    };
    percentages: string;
  }[];
};

class UserMatchDTO {
  suitableUsers?: {
    id?: string;
    firstName?: string;
    lastName?: string;
    title?: string;
    avatarUrl?: string;
    profileLevel?: ProfileLevel;
    languages?: LanguageType[];
    skills?: SkillType[];
    suitabilityPercentage?: string;
  }[];

  static fromModel(candidateModel: MatchModel | null): UserMatchDTO {
    let candidateDto = new UserMatchDTO();

    candidateDto.suitableUsers = candidateModel
      ? candidateModel.suitableUsers.map((user) => {
          console.log(JSON.stringify(user.user));

          return {
            id: user.user.userId,
            firstName: user.user.user.firstName,
            lastName: user.user.user.lastName,
            title: user.user.user.title,
            suitabilityPercentage: user.percentages,
            profileLevel: user.user.profileLevel,
            skills: user.user.skills?.map((skill) => skill.skill),
            languages: user.user.languages?.map((language) => language.language),
            avatarUrl: user.user.user.avatarUrl,
          };
        })
      : [];

    return candidateDto;
  }
}

export default UserMatchDTO;
