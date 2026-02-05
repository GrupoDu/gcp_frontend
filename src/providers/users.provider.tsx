"use client";

import { UserContext } from "@/context/user.context";
import { useFetch } from "@/hooks/useFetch";
import { User } from "@/types/user.type";
import { useMemo } from "react";

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { data, err, status, refetch } = useFetch<User>(
    "http://localhost:8000/users/",
  );

  return (
    <UserContext.Provider
      value={{ usersData: data?.users, err, status, refetch }}
    >
      {children}
    </UserContext.Provider>
  );
}
