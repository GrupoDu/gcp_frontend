import { AssistantsRegisters } from "./assistantsRegister.type";

export type ApiConfig = {
  endpoint: string;
  method: string;
  bodyValues: Record<string, unknown>;
  assistantsRegister?: AssistantsRegisters[];
};
