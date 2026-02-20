import AnualAnalysisContext from "@/context/anualAnalysis.context";
import { useContext } from "react";

export function useAnualAnalysis() {
  const anualAnalysisContext = useContext(AnualAnalysisContext);

  if (anualAnalysisContext === undefined) {
    throw new Error("useAnualAnalysis deve ser usado dentro de um Provider.");
  }

  return anualAnalysisContext;
}
