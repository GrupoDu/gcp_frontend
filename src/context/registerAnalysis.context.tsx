import { RegisterAnalysis } from "@/types/registerAnalysis.type";
import { createContext } from "react";

export type RegisterAnalysisContextValues = {
  registerAnalysis: RegisterAnalysis | undefined;
  status: string | undefined;
  err: string | undefined;
};

export const RegisterAnalysisContext = createContext<
  RegisterAnalysisContextValues | undefined
>(undefined);
