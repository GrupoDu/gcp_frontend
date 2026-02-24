"use client";

import { GoalsAnalysisContext } from "@/context/goalsAnalysis.context";
import { useFetch } from "@/hooks/useFetch";
import { GoalsAnalysis } from "@/types/goalsAnalysis.type";
import { useMemo } from "react";

export function GoalsAnalysisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, err, status } = useFetch<GoalsAnalysis>("goalsAnalysis");

  const goalsAnalysisData = useMemo(
    () => ({
      goalsAnalysis: data || { goalsAchieved: 0, goalsNotAchieved: 0 },
      status,
      err,
    }),
    [data, err, status],
  );

  return (
    <GoalsAnalysisContext.Provider value={goalsAnalysisData}>
      {children}
    </GoalsAnalysisContext.Provider>
  );
}
