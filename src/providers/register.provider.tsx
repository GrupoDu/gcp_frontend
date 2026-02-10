"use client";

import { RegisterContext } from "@/context/register.context";
import { useFetch } from "@/hooks/useFetch";
import { Register } from "@/types/register.type";
import { useMemo } from "react";

export function RegisterProvider({ children }: { children: React.ReactNode }) {
  const { data, err, status, refetch } = useFetch<Register[]>(
    "http://localhost:8000/registers/",
  );

  const registersData = useMemo(
    () => ({
      registersData: data || undefined,
      err,
      status,
      refetch,
    }),
    [data, err, status, refetch],
  );

  return (
    <RegisterContext.Provider value={registersData}>
      {children}
    </RegisterContext.Provider>
  );
}
