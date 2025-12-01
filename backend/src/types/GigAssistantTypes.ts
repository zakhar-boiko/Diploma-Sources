export type ParticipantType = "USER" | "ASSISTANT";
export type AssistantMessageType = {
  role: ParticipantType;
  content: string;
};
