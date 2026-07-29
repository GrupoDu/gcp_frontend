import AnualAnalysisContext from "@/context/anualAnalysis.context";
import { useFetch } from "@/hooks/useFetch";
import { AnnualAnalysis } from "@/types/annualAnalysis.interface";
import { useMemo } from "react";

export function AnualAnalysisProvider({ children }: { children: React.ReactNode }) {
  const { data, err, status } = useFetch<AnnualAnalysis[]>("annualAnalysis");

  const annualAnalysisData = useMemo(
    () => ({
      annualAnalysis: data || undefined,
      status: status,
      err: err,
    }),
    [data, err, status],
  );

  return <AnualAnalysisContext.Provider value={annualAnalysisData}>{children}</AnualAnalysisContext.Provider>;
}
