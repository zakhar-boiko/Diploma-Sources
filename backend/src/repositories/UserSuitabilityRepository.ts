import { Gig } from "../models/Gig";
import { GigLanguage } from "../models/GigLanguage";
import { GigSkill } from "../models/GigSkill";
import { Language } from "../models/Language";
import { Skill } from "../models/Skill";
import { UserSuitability } from "../models/UserSuitability";
import { UserSuitableGigs } from "../models/UserSuitableGigs";

const getGigSuitableGigs = async (userId: string) => {
    const gigs = await UserSuitability.findByPk(userId, {
      include: [
        {
          model: UserSuitableGigs,
          include: [
            {
              model: Gig,
              attributes: {
                  exclude: ["gigVector"]
              },
            //   include: [ { model: GigSkill, include: [Skill]}, { model: GigLanguage, include: [Language]}],
            },
          ],
        },
      ],
    });
  
    return gigs;
  };

  export { getGigSuitableGigs}