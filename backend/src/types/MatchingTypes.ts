import { GigType } from "./GigTypes";
import { ConsultantType } from "./UserTypes";

export type MatchedUserType = {
  candidate: ConsultantType;
  score: number;
};

export type MatchedGigType = {
  gig: GigType;
  score: number;
};

export type OverallCandidateMatchType = {
  userId?: string;
  percentage: number;
};

export type AiAnalyzedCandidateMatchType = {
  id: string;
  overviewScore: number;
  skillsScore: number;
};

export type OverallGigMatchType = {
  gigId?: string;
  percentage: number;
};
