import { ProductionOrderAnalysis } from "@/types/productionOrderAnalysis.type";
import { createContext } from "react";

export type ProductionOrderAnalysisContextValues = {
  registerAnalysis: ProductionOrderAnalysis | undefined;
  status: string | undefined;
  err: string | undefined;
};

export const ProductionOrderAnalysisContext = createContext<
  ProductionOrderAnalysisContextValues | undefined
>(undefined);
