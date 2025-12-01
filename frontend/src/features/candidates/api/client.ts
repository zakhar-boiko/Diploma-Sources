import { useQuery } from "react-query";
import { ApiClient } from "../../../lib/api/client";
import { PaginatedCandidatesType } from "./types";

export const useFetchFilteredCandidates = (parsedFilters: string) => {
  return useQuery(
    ['candidates', parsedFilters],
    () => {
      return ApiClient.get<PaginatedCandidatesType, PaginatedCandidatesType>(
        "/profiles/candidates" + parsedFilters
      );
    },
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );
};
