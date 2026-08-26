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
 * @param trackParams - Booleano que indica se deve buscar os query params
 */
export function useFetch<T>(endpoint: string, trackParams?: boolean) {
  const [fetchedData, setFetchedData] = useState<FetchResponse<T>>();
  const searchParams = useSearchParams();
  const { setIsLoading } = useLoading();
  const [trigger, setTrigger] = useState(0);
  const [maxPages, setMaxPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const params = new URLSearchParams(searchParams);
      const hasParams = trackParams && params.toString().length > 0;

      try {
        const url = `/${endpoint}${hasParams ? `?${params.toString()}` : ""}`;
        const fetchedData = await fetchItems(url);

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
  }, [endpoint, trigger, searchParams, trackParams]);

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
