"use client";

import { createContext } from "react";
import { WeldersActivities } from "@/types/weldersActivities.interface";

interface WeldersActivitiesContextValues {
  weldersActivities: WeldersActivities[] | undefined;
  err: string | undefined;
  status: string | undefined;
}

export const WeldersActivitiesContext = createContext<WeldersActivitiesContextValues | undefined>(undefined);
