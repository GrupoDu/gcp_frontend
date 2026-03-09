"use client";

import { createContext } from "react";
import { Goal } from "@/types/goal.type";

export type GoalContextValues = {
  goalsData: Goal[] | undefined;
  err: string | undefined;
  status: string | undefined;
  refetch?: () => void;
};

export const GoalContext = createContext<GoalContextValues | undefined>(undefined);
