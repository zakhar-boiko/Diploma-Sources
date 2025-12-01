import { randomUUID } from "crypto";
import { OverallGigMatchType } from "../types/MatchingTypes";
import { UserSuitableGigs } from "../models/UserSuitableGigs";

const addSuitableGigs = async (
  userId: string,
  matches: OverallGigMatchType[]
) => {
  const suitableGigs = matches.map((match) => ({
    gigId: match.gigId,
    userSuitabilityId: userId,
    id: randomUUID(),
    percentages: match.percentage,
  }));

  await UserSuitableGigs.bulkCreate(suitableGigs, {
    returning: true,
  });
};

const deleteSuitableGigsByUserId = async (userId: string) => {
  await UserSuitableGigs.destroy({
    where: {
      userSuitabilityId: userId,
    },
  });
};

export { addSuitableGigs, deleteSuitableGigsByUserId };
