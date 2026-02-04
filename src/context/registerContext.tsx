"use client";

import { useFetch } from "@/hooks/useFetch";
import { Register } from "@/types/register.type";
import { createContext } from "react";

type RegisterContextValues = {
  registersData: Register[] | undefined;
  err: string | undefined;
  status: string | undefined;
  refetch: () => void;
};

export const RegisterContext = createContext<RegisterContextValues | undefined>(
  undefined,
);

export function RegisterProvider({ children }: { children: React.ReactNode }) {
  const { data, err, status, refetch } = useFetch<Register>(
    "http://localhost:8000/registers/",
  );

  return (
    <RegisterContext.Provider
      value={{ registersData: data?.registers, err, status, refetch }}
    >
      {children}
    </RegisterContext.Provider>
  );
}
