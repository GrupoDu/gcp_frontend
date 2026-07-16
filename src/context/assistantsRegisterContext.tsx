"use client";

import { createContext } from "react";
import { AssistantsRegisters } from "@/types/assistantsRegister.interface";

export type assistantsRegisterContextValues = {
  assistantsRegisters: AssistantsRegisters[] | undefined;
  status: string | undefined;
  err: string | undefined;
  refetch: () => void;
};

export const AssistantsRegisterContext = createContext<assistantsRegisterContextValues | undefined>(undefined);
