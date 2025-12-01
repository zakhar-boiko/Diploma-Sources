import { ConsultantType } from "../../profile/api/types";

export type FilterOptions = {
  skills: string[];
  languages: string[];
  profileLevel: string[];
  page: number;
};

export type PaginatedCandidatesType = {
    hasMore: boolean,
    candidates: ConsultantType[]
}