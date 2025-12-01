import { ConsultantType } from "../../profile/api/types";

export type GigMatchType = {
  suitableJobs?: GigSuggestionType[];
};

export type GigSuggestionType = {
  id: string;
  title: string;
  publishingDate: string;
  suitabilityPercentage: number;
};

export type SuitableUserType = ConsultantType & {
  suitabilityPercentage?: number;
};


export type CandidateSuggesstionType = {
  suitableUsers: SuitableUserType[];
};
