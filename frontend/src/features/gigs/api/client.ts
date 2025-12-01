import { useQuery } from "react-query";
import { ApiClient } from "../../../lib/api/client";
import { GigType, PaginatedGigsResponse } from "./types";

export const useFetchGigs = (page: number) => {
  return useQuery(
    ["gigs", page],
    () => {
      return ApiClient.get<PaginatedGigsResponse, PaginatedGigsResponse>(
        `/gigs?page=${page}`
      );
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
};

export const useFetchGigDetails = (gigId: string) => {
  return useQuery(
    ["gig-details", gigId],
    () => {
      return ApiClient.get<GigType, GigType>(`/gigs/${gigId}`);
    },
    {
      refetchOnWindowFocus: false,
    }
  );
};
