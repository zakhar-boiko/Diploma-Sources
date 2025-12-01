import { randomUUID } from "crypto";
import { GigSuitableUser } from "../models/GigSuitableUser";
import { OverallCandidateMatchType } from "../types/MatchingTypes";
import { Op } from "sequelize";

const getSuitableUsersByGigId = async (gigId: string) => {
  return await GigSuitableUser.findAll({
    where: { gigSuitabilityId: gigId },
  });
};

const addSuitableUsers = async (
  gigId: string,
  matches: OverallCandidateMatchType[]
) => {
  const suitableUsers = matches.map((match) => ({
    gigSuitabilityId: gigId,
    userId: match.userId,
    id: randomUUID(),
    percentages: match.percentage,
  }));

  await GigSuitableUser.bulkCreate(suitableUsers, {
    returning: true,
  });
};

const deleteAllSuitableUsersByGigId = async (
  gigId: string,
) => {
  await GigSuitableUser.destroy({
    where: {
      gigSuitabilityId: gigId,
    },
  });
};

const deleteSuitableUsersByGigIdAndUserIds = async (
  gigId: string,
  userIds: string[]
) => {
  await GigSuitableUser.destroy({
    where: { gigSuitabilityId: gigId, userId: { [Op.in]: userIds } },
  });
};

export { addSuitableUsers, deleteAllSuitableUsersByGigId, deleteSuitableUsersByGigIdAndUserIds, getSuitableUsersByGigId };
