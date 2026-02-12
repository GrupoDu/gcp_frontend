import { ProductionOrderAnalysisContext } from "@/context/registerAnalysis.context";
import { useContext } from "react";

export function useProductionOrderAnalysis() {
  const productionOrderAnalysisContext = useContext(
    ProductionOrderAnalysisContext,
  );

  if (productionOrderAnalysisContext === undefined)
    throw new Error("useRegisterAnalysis deve ser usado com um Provider.");

  return productionOrderAnalysisContext;
}
