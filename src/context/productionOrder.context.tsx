"use client";

import { ProductionOrder } from "@/types/productionOrder.interface";
import { createContext } from "react";

type ProductionOrderContextValues = {
  allProductionOrders: ProductionOrder[] | undefined;
  err: string | undefined;
  status: string | undefined;
  refetch: () => void;
};

export const ProductionOrderContext = createContext<ProductionOrderContextValues | undefined>(undefined);
