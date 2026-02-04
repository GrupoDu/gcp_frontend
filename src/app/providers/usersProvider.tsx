"use client";

import { UserContext } from "@/context/userContext";
import { useFetch } from "@/hooks/useFetch";
import { User } from "@/types/user.type";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { data, err, status } = useFetch<User>("http://localhost:8000/users/");

  const userData = useMemo(
    () => ({
      usersData: data?.users || undefined,
      err,
      status,
    }),
    [data, err, status],
  );

  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
}
