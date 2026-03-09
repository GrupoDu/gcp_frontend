"use client";

import { User } from "@/types/user.type";
import { createContext } from "react";

interface SupervisorContextValues {
  supervisorsData: User[] | undefined;
  err: string | undefined;
  status: string | undefined;
}

export const SupervisorContext = createContext<SupervisorContextValues | undefined>(undefined);
