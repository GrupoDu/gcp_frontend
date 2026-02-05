"use client";

import { useState, useEffect, useCallback } from "react";

type FetchResponse<T> = {
  status: string;
  data?: T;
  err?: string;
};

export const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTBkYTkwMjQtZTc5Yy00NzYxLTk0NjgtODAyNjAyNTNiYmYyIiwidXNlcl90eXBlIjoiYWRtaW4iLCJpYXQiOjE3NzAyOTM1ODUsImV4cCI6MTc3Mjg4NTU4NX0.lB0u9nAtj0p9tULIBEuFzPLsYWwDwEqWbqURSde-BG0";

export function useFetch<T>(url: string, params?: string) {
  const [fetchedData, setFetchedData] = useState<FetchResponse<T>>();
  const [trigger, setTrigger] = useState(0);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`${url}${params ? params : ""}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await response.json();

      if (!data) {
        setFetchedData({
          status: "failed",
          err: "Dados não encontrados.",
        });

        return;
      }

      console.log(data);

      setFetchedData({
        status: "success",
        data: data,
      });
    } catch (err) {
      setFetchedData({
        status: "failed",
        err: (err as Error).message,
      });
    }
  }, [url, params]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, [fetchData, trigger]);

  const refetch = useCallback(() => {
    setTrigger((prev) => prev + 1);
  }, []);

  return {
    data: fetchedData?.data,
    err: fetchedData?.err,
    status: fetchedData?.status,
    refetch,
  };
}
