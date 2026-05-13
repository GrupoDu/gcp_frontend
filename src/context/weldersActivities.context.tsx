"use client";

import { createContext } from "react";
import { WeldersActivities } from "@/types/weldersActivities.type";

interface WeldersActivitiesContextValues {
  weldersActivities: WeldersActivities[] | undefined;
  err: string | undefined;
  status: string | undefined;
}

export const WeldersActivitiesContext = createContext<WeldersActivitiesContextValues | undefined>(undefined);
