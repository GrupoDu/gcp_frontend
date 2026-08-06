"use client";

import { createContext } from "react";
import { EmployeeAnalysis, EmployeeAnalysisFullYear } from "@/types/employeeAnalysis.interface";

type EmployeeAnalysisContextType = {
  employeeAnalysis: EmployeeAnalysis;
  analysisFullYear: EmployeeAnalysisFullYear[];
};

export const EmployeeAnalysisContext = createContext<EmployeeAnalysisContextType | undefined>(undefined);
