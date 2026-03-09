"use client";

import { UserContext } from "@/context/user.context";
import { useFetch } from "@/hooks/useFetch";
import { User } from "@/types/user.type";
import { useMemo } from "react";

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { data, err, status, refetch } = useFetch<User[]>("users");

  const usersData = useMemo(
    () => ({
      usersData: data || undefined,
      err,
      status,
      refetch,
    }),
    [data, err, status, refetch],
  );

  return <UserContext.Provider value={usersData}>{children}</UserContext.Provider>;
}
