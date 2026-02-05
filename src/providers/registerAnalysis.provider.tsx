"use client";

import { RegisterAnalysisContext } from "@/context/registerAnalysis.context";
import { useFetch } from "@/hooks/useFetch";
import { RegisterAnalysis } from "@/types/registerAnalysis.type";
import { useMemo } from "react";

export function RegisterAnalysisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, err, status } = useFetch<RegisterAnalysis>(
    "http://localhost:8000/registers-analysis/",
  );

  const registerAnalysisData = useMemo(
    () => ({
      registerAnalysis: data || undefined,
      status,
      err,
    }),
    [data, err, status],
  );

  return (
    <RegisterAnalysisContext.Provider value={registerAnalysisData}>
      {children}
    </RegisterAnalysisContext.Provider>
  );
}
