import { createContext } from "react";
import { AnualAnalysis } from "@/types/anualAnalysis.interface";

interface AnualAnalysisContextType {
  anualAnalysis: AnualAnalysis[] | undefined;
  status: string | undefined;
  err: string | undefined;
}

const AnualAnalysisContext = createContext<AnualAnalysisContextType | undefined>(undefined);

export default AnualAnalysisContext;
