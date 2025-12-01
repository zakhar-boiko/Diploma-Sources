import { useMutation } from "react-query";
import { ApiClient } from "../../../lib/api/client";
import { GigDataType, GigType } from "../../gigs/api/types";
import { AssistantMessageType } from "./types";

export const useAddGigMutation = () => {
  return useMutation((gigData: GigDataType) => {
    return ApiClient.post<GigType, GigType>("/gigs", gigData);
  });
};

export const useSendAssistantMessageMutation = () => {
  return useMutation((messages: AssistantMessageType[]) => {
    return ApiClient.post<AssistantMessageType, AssistantMessageType>("/gigs/assistant/chat", {
      messages,
    });
  });
};

export const useFillGigDataMutation = () => {
  return useMutation((messages: AssistantMessageType[]) => {
    return ApiClient.post<GigDataType, GigDataType>("/gigs/assistant/summarize", {
      messages,
    });
  });
};