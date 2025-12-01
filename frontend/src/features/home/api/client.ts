import { useQuery } from "react-query";
import { ApiClient } from "../../../lib/api/client";
import { CandidateSuggesstionType, GigMatchType } from "./types";
import { GigType } from "../../gigs/api/types";

export const useCandidateJobsSuggestions = () => {
  return useQuery(
    ["gig-suggestions"],
    () => {
      return ApiClient.get<GigMatchType, GigMatchType>("/profiles/me/matches");
    },
    {
      retry: 0,
    }
  );
};

export const useFetchUsersGigs = () => {
  return useQuery(
    ["user-gigs"],
    () => {
      return ApiClient.get<GigType[], GigType[]>("/profiles/me/gigs");
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
    }
  );
};

export const useFetchGigSuggestions = (gigId: string) => {
  return useQuery(
    ["gig-suggestions", gigId],
    () => {
      return ApiClient.get<
        CandidateSuggesstionType,
        CandidateSuggesstionType
      >(`/gigs/matches/${gigId}`);
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
    }
  );
};
