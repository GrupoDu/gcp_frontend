import { AssistantsRegisters } from "./assistantsRegister.interface";

export interface ApiConfig<T> {
  endpoint: string;
  method: string;
  bodyValues: T;
  assistantsRegister?: AssistantsRegisters[];
}
