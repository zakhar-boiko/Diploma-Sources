import { Candidate } from "../models/Candidate";
import { GigSuitability } from "../models/GigSuitability";
import { GigSuitableUser } from "../models/GigSuitableUser";
import { Language } from "../models/Language";
import { Skill } from "../models/Skill";
import User from "../models/User";
import { UserLanguage } from "../models/UserLanguage";
import { UserSkill } from "../models/UserSkill";

const addGigSuitability = async (gigId: string) => {
  const gigSuitability = {
    gigId: gigId,
    id: gigId,
  };

  await GigSuitability.create(gigSuitability, {
    returning: true,
  });
};

const getGigSuitableUsers = async (gigId: string) => {
  const gigs = await GigSuitability.findByPk(gigId, {
    include: [
      {
        model: GigSuitableUser,
        include: [
          {
            model: Candidate,
            attributes: {
                exclude: ["skillsVector", "vector"]
            },
            include: [User, { model: UserSkill, include: [Skill]}, { model: UserLanguage, include: [Language]}],
          },
        ],
      },
    ],
  });

  return gigs;
};

export { addGigSuitability, getGigSuitableUsers };
