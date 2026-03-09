"use client";

import { ProductionOrderAnalysisContext } from "@/context/registerAnalysis.context";
import { useFetch } from "@/hooks/useFetch";
import { ProductionOrderAnalysis } from "@/types/productionOrderAnalysis.type";
import { useMemo } from "react";

export function ProductionOrderAnalysisProvider({ children }: { children: React.ReactNode }) {
  const { data, err, status } = useFetch<ProductionOrderAnalysis>("productionOrderAnalysis");

  const registerAnalysisData = useMemo(
    () => ({
      registerAnalysis: data || undefined,
      status,
      err,
    }),
    [data, err, status],
  );

  return (
    <ProductionOrderAnalysisContext.Provider value={registerAnalysisData}>
      {children}
    </ProductionOrderAnalysisContext.Provider>
  );
}
