import { createContext } from "react";
import { ProductionOrderAnalysis } from "@/types/productionOrderAnalysis.interface";
import { AnnualAnalysis } from "@/types/annualAnalysis.interface";

type DashboardAnalyticsContextType = {
  productionOrderAnalysis: ProductionOrderAnalysis;
  annualAnalysis: AnnualAnalysis[];
};

export const DashboardAnalyticsContext = createContext<DashboardAnalyticsContextType | undefined>(undefined);
