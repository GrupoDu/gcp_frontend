import AnualAnalysisContext from "@/context/anualAnalysis.context";
import { useFetch } from "@/hooks/useFetch";
import { AnualAnalysis } from "@/types/anualAnalysis.type";
import { useMemo } from "react";

export function AnualAnalysisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, err, status } = useFetch<AnualAnalysis[]>(
    "http://localhost:8000/anual-analysis/",
  );

  const anualAnalysisData = useMemo(
    () => ({
      anualAnalysis: data || undefined,
      status: status,
      err: err,
    }),
    [data, err, status],
  );

  return (
    <AnualAnalysisContext.Provider value={anualAnalysisData}>
      {children}
    </AnualAnalysisContext.Provider>
  );
}
