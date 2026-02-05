import { RegisterAnalysisContext } from "@/context/registerAnalysis.context";
import { useContext } from "react";

export function useRegisterAnalysis() {
  const registerAnalysisContext = useContext(RegisterAnalysisContext);

  if (registerAnalysisContext === undefined)
    throw new Error("useRegisterAnalysis deve ser usado com um Provider.");

  return registerAnalysisContext;
}
