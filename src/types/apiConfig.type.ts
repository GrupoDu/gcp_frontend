import { AssistantsPORegisters } from "@/types/assistantsPORegister.type";

export type ApiConfig = {
  endpoint: string;
  method: string;
  bodyValues: Record<string, unknown>;
  assistantsRegister?: AssistantsPORegisters[];
};
