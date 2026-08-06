"use client";

import { ProductionOrderAnalysisContext } from "@/context/registerAnalysis.context";
import { useFetch } from "@/hooks/useFetch";
import { ProductionOrderAnalysis } from "@/types/productionOrderAnalysis.interface";
import React, { useMemo } from "react";

export function ProductionOrderAnalysisProvider({ children }: { children: React.ReactNode }) {
  const { data, err, status } = useFetch<ProductionOrderAnalysis>("productionOrderAnalysis");

  const productionOrderAnalysis = useMemo(
    () => ({
      productionOrderAnalysis: data || undefined,
      status,
      err,
    }),
    [data, err, status],
  );

  return (
    <ProductionOrderAnalysisContext.Provider value={productionOrderAnalysis}>
      {children}
    </ProductionOrderAnalysisContext.Provider>
  );
}
