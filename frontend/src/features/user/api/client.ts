import { useMutation, useQuery } from "react-query";
import { ApiClient } from "../../../lib/api/client";
import { ClientType, ConsultantType } from "../../profile/api/types";

export const useFetchUser = (userId: string) => {
  return useQuery(
    ["profile", userId],
    () => {
      return ApiClient.get<
        ClientType | ConsultantType,
        ClientType | ConsultantType
      >(`/profiles/${userId}`);
    },
    {
      retry: 0,
      keepPreviousData: true,
    }
  );
};
