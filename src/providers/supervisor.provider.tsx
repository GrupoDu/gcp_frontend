"use client";

import { SupervisorContext } from "@/context/supervisor.context";
import { useFetch } from "@/hooks/useFetch";
import { User } from "@/types/user.interface";
import { useMemo } from "react";

export function SupervisorProvider({ children }: { children: React.ReactNode }) {
  const { data, err, status } = useFetch<User[]>(`users/supervisor/`);

  const supervisorsData = useMemo(
    () => ({
      supervisorsData: data || undefined,
      err,
      status,
    }),
    [data, err, status],
  );

  return <SupervisorContext.Provider value={supervisorsData}>{children}</SupervisorContext.Provider>;
}
