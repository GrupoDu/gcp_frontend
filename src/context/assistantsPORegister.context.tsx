"use client";

import { createContext } from "react";
import { AssistantsPORegisters } from "@/types/assistantsPORegister.type";

export type assistantsPORegisterContextValues = {
  assistantsPORegisters: AssistantsPORegisters[] | undefined;
  status: string | undefined;
  err: string | undefined;
  refetch: () => void;
};

export const AssistantsPORegisterContext = createContext<assistantsPORegisterContextValues | undefined>(undefined);
