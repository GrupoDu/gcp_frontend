"use client";

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

