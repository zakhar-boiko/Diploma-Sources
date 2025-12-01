import { GigType } from "../types/GigTypes";

type MatchModel = {
  suitableJobs: {
    gig: GigType;
    percentages: number;
  }[];
};

class GigMatchDTO {
  suitableJobs?: {
    id?: string;
    title?: string;
    publishingDate?: string;
    suitabilityPercentage?: number;
  }[];

  static fromModel(gigsModel: MatchModel | null): GigMatchDTO {
    let gigDTO = new GigMatchDTO();

    gigDTO.suitableJobs = gigsModel
      ? gigsModel.suitableJobs.map((gig) => {
          return {
            title: gig.gig.title,
            suitabilityPercentage: gig.percentages,
            id: gig.gig.id,
            publishingDate: gig.gig.publicationDate.toISOString(),
          };
        })
      : [];

    return gigDTO;
  }
}

export default GigMatchDTO;
