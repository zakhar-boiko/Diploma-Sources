import { useMutation, useQuery } from "react-query";
import { ApiClient } from "../../../lib/api/client";
import {
  ClientType,
  ConsultantType,
  ExperienceType,
  LanguageType,
  SkillType,
  UserType,
} from "./types";

export const useFetchProfile = () => {
  return useQuery(
    ["profile"],
    () => {
      return ApiClient.get<
        ClientType | ConsultantType,
        ClientType | ConsultantType
      >("/profiles/me");
    },
    {
      retry: 0,
      keepPreviousData: true,
    }
  );
};

export const useUpdateProfileMutation = () => {
  return useMutation((fields: Partial<UserType>) => {
    return ApiClient.patch("/profiles/me/personal-details", fields);
  });
};

export const useUploadAvatarMutation = () => {
  return useMutation((data: FormData) => {
    return ApiClient.post("/profiles/me/avatar", data);
  });
};

export const useUpdateSkillsMutation = () => {
  return useMutation((skills: string[]) => {
    return ApiClient.put("/profiles/me/skills", skills);
  });
};

export const useUpdateLanguagesMutation = () => {
  return useMutation((languages: string[]) => {
    return ApiClient.put("/profiles/me/languages", languages);
  });
};

export const useAddExperience = () => {
  return useMutation((experience: ExperienceType) => {
    return ApiClient.post("/profiles/me/experiences", experience);
  });
};

export const useUploadCvMutation = () => {
  return useMutation((data: FormData) => {
    return ApiClient.post("/profiles/me/cv", data);
  });
};

export const useFetchAvailableSkills = () => {
  return useQuery(
    ["skills"],
    () => {
      return ApiClient.get<SkillType[], SkillType[]>("/skills");
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );
};

export const useFetchAvailableLanguages = () => {
  return useQuery(
    ["languages"],
    () => {
      return ApiClient.get<LanguageType[], LanguageType[]>("/languages");
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );
};

export const useUpdateSpecializedProfileMutation = () => {
  return useMutation(
    (fields: Partial<ConsultantType> | Partial<ClientType>) => {
      return ApiClient.patch("/profiles/me", fields);
    }
  );
};
