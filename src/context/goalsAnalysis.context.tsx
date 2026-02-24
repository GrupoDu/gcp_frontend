"use client";

import { GoalsAnalysis } from "@/types/goalsAnalysis.type";
import { createContext } from "react";

interface GoalsAnalysisContextValues {
  goalsAnalysis: GoalsAnalysis;
  status: string | undefined;
  err: string | undefined;
}

export const GoalsAnalysisContext = createContext<
  GoalsAnalysisContextValues | undefined
>(undefined);
