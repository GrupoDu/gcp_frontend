"use client";

import { WeldersActivitiesContext } from "@/context/weldersActivities.context";
import { useFetch } from "@/hooks/useFetch";
import { WeldersActivities } from "@/types/weldersActivities.type";
import { debugLogger } from "@/utils/logger";
import React, { useMemo } from "react";

export const WeldersActivitiesProvider = ({ children }: { children: React.ReactNode }) => {
  const { status, data, err } = useFetch<WeldersActivities[]>("welders-activities");

  debugLogger(`
    ||> WeldersActivitiesProvider <||
    ---------------------------------
    ||> Status: ${status}
    ||> Data: ${JSON.stringify(data)}
    ||> Error: ${err}
  `);

  const weldersActivities = useMemo(() => {
    return {
      weldersActivities: data,
      err,
      status,
    };
  }, [data, err, status]);

  return <WeldersActivitiesContext value={weldersActivities}>{children}</WeldersActivitiesContext>;
};
