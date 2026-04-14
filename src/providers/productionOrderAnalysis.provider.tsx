"use client";

import { ProductionOrderAnalysisContext } from "@/context/registerAnalysis.context";
import { useFetch } from "@/hooks/useFetch";
import { ProductionOrderAnalysis } from "@/types/productionOrderAnalysis.type";
import React, { useMemo } from "react";

export function ProductionOrderAnalysisProvider({ children }: { children: React.ReactNode }) {
  const { data, err, status } = useFetch<ProductionOrderAnalysis>("production-order-analysis");

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
