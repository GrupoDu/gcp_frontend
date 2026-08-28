"use client";

import { api } from "@/services/api";
import { useState, useEffect, useCallback } from "react";
import { useLoading } from "./useLoading";
import { useSearchParams } from "next/navigation";

type FetchResponse<T> = {
  status: string;
  data?: T;
  err?: string;
};

async function fetchItems(endpoint: string) {
  const response = await api.get(endpoint);

  return response.data;
}

/**
 * Custom hook para buscar dados de uma API.
 *
 * @param endpoint - endpoint da requisição
 */
export function useFetch<T>(endpoint: string) {
  const [fetchedData, setFetchedData] = useState<FetchResponse<T>>();
  const searchParams = useSearchParams();
  const { setIsLoading } = useLoading();
  const [trigger, setTrigger] = useState(0);
  const [maxPages, setMaxPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const fetchedData = await fetchItems(endpoint);

        setMaxPages(fetchedData.maxPages);

        setFetchedData({
          status: "success",
          data: fetchedData.data,
        });
      } catch (err) {
        const error = err as Error;
        setFetchedData({
          status: "failed",
          err: error.message,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [endpoint, trigger, searchParams]);

  const refetch = useCallback(() => {
    setTrigger((prev) => prev + 1);
  }, []);

  return {
    data: fetchedData?.data,
    err: fetchedData?.err,
    status: fetchedData?.status,
    maxPages,
    refetch,
  };
}
