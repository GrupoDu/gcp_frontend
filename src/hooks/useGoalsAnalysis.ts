import { GoalsAnalysisContext } from "@/context/goalsAnalysis.context";
import { useContext } from "react";

export function useGoalsAnalysis() {
  const context = useContext(GoalsAnalysisContext);

  if (!context) throw new Error("useGoalsAnalysis deve ser usado com um Provider.");

  return context;
}
