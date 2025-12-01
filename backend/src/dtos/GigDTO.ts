import { GigType } from "../types/GigTypes";
import { LanguageType, SkillType } from "../types/UserTypes";
import { ProfileLevel } from "../types/enums/UserEnums";

class GigDTO {
  id?: string;
  title?: string;
  creatorId?: string;
  description?: string;
  profileLevel?: ProfileLevel;
  publicationDate?: Date;
  languages?: LanguageType[];
  skills?: SkillType[];

  static fromModel(gigModel: GigType): GigDTO {
    let gigDto = new GigDTO();
    const transformedSkills = gigModel.skills.map((skill) => skill?.skill);

    const transformedLanguages = gigModel?.languages?.map(
      (language) => language?.language
    );

    gigDto = {
      id: gigModel.id,
      title: gigModel.title,
      description: gigModel.description,
      skills: transformedSkills,
      languages: transformedLanguages,
      creatorId: gigModel.creatorId,
      profileLevel: gigModel.profileLevel,
      publicationDate: gigModel.publicationDate
    };

    return gigDto;
  }
}

export default GigDTO;
