"use client";

import { api } from "@/services/api";
import { useState, useEffect, useCallback } from "react";
import { useLoading } from "./useLoading";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import { createParamsString } from "@/utils/createParamsString";

type FetchResponse<T> = {
  status: string;
  data?: T;
  err?: string;
};

/**
 * Custom hook para buscar dados de uma API.
 *
 * @param endpoint - endpoint da requisição
 * @param useParams - Booleano que indica se deve buscar os query params
 */
export function useFetch<T>(endpoint: string, useParams?: boolean) {
  const [fetchedData, setFetchedData] = useState<FetchResponse<T>>();
  const searchParams = useSearchParams();
  const { setIsLoading } = useLoading();
  const [trigger, setTrigger] = useState(0);
  const [maxPages, setMaxPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const { paramsString, hasParams } = createParamsString(searchParams);
      const params = useParams && hasParams ? `/filter?${paramsString}` : "";

      try {
        const url = `/${endpoint}${params}`;
        const apiResponse = await api.get(url);

        const responseData = await apiResponse.data.data;
        const responseError = !responseData || apiResponse.data.error;

        if (responseError) {
          setFetchedData({
            status: "failed",
            err: "Dados não encontrados.",
          });

          toast.error(apiResponse.data.error);
          return;
        }

        setMaxPages(apiResponse.data.maxPages);

        setFetchedData({
          status: "success",
          data: responseData,
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
  }, [endpoint, trigger, searchParams, useParams]);

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
