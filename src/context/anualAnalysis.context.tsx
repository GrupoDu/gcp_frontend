import { createContext } from "react";
import { AnnualAnalysis } from "@/types/annualAnalysis.interface";

interface AnualAnalysisContextType {
  annualAnalysis: AnnualAnalysis[] | undefined;
  status: string | undefined;
  err: string | undefined;
}

const AnualAnalysisContext = createContext<AnualAnalysisContextType | undefined>(undefined);

export default AnualAnalysisContext;
