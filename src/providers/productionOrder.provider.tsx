"use client";

import { ProductionOrderContext } from "@/context/productionOrder.context";
import { useFetch } from "@/hooks/useFetch";
import { ProductionOrder } from "@/types/productionOrder.type";
import { useMemo } from "react";

export function ProductionOrderProvider({ children }: { children: React.ReactNode }) {
  const { data, err, status, refetch } = useFetch<ProductionOrder[]>("production-orders");

  const productionOrders = useMemo(
    () => ({
      allProductionOrders: data,
      err,
      status,
      refetch,
    }),
    [data, err, status, refetch],
  );

  return <ProductionOrderContext.Provider value={productionOrders}>{children}</ProductionOrderContext.Provider>;
}
