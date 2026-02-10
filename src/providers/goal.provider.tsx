"use client";

import { GoalContext } from "@/context/goal.context";
import { useFetch } from "@/hooks/useFetch";
import { Goal } from "@/types/goal.type";
import { useMemo } from "react";

export function GoalProvider({ children }: { children: React.ReactNode }) {
  const { data, err, status, refetch } = useFetch<Goal[]>(
    "http://localhost:8000/goals/",
  );

  const goalData = useMemo(
    () => ({
      goalsData: data || undefined,
      err,
      status,
      refetch,
    }),
    [data, err, status, refetch],
  );

  return (
    <GoalContext.Provider value={goalData}>{children}</GoalContext.Provider>
  );
}
