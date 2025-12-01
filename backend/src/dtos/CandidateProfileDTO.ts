import {
  CandidateFullProfile,
  ExperienceType,
  LanguageType,
  SkillType,
} from "../types/UserTypes";
import { AccountType, ProfileLevel } from "../types/enums/UserEnums";

class CandidateProfileDTO {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  title?: string;
  avatarUrl?: string;
  accountType?: AccountType;
  mobileNumber?: string;
  description?: string;
  profileLevel?: ProfileLevel;
  experiences?: ExperienceType[];
  languages?: LanguageType[];
  skills?: SkillType[];
  cvUrl?: string;

  static fromModel(candidateModel: CandidateFullProfile): CandidateProfileDTO {
    let candidateDto = new CandidateProfileDTO();

    const transformedSkills = candidateModel?.consultant.skills?.map(
      (skill) => {
        return skill?.skill;
      }
    );
    const transformedLanguages = candidateModel?.consultant?.languages?.map(
      (language) => language.language
    );

    candidateDto = {
      id: candidateModel.id,
      accountType: candidateModel.accountType,
      email: candidateModel.email,
      title: candidateModel.title,
      firstName: candidateModel.firstName,
      lastName: candidateModel.lastName,
      mobileNumber: candidateModel.mobileNumber,
      avatarUrl: candidateModel.avatarUrl,
      description: candidateModel.description,
      skills: transformedSkills,
      languages: transformedLanguages,
      cvUrl: candidateModel.consultant.cvUrl,
      experiences: candidateModel.consultant.experiences,
      profileLevel: candidateModel.consultant.profileLevel,
    };

    return candidateDto;
  }
}

export default CandidateProfileDTO;
