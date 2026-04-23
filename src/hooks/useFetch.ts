"use client";

import { api } from "@/services/api";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { useLoading } from "./useLoading";
import { toast } from "react-toastify";

type FetchResponse<T> = {
  status: string;
  data?: T;
  err?: string;
};

export function useFetch<T>(endpoint: string, params?: string) {
  const [fetchedData, setFetchedData] = useState<FetchResponse<T>>();
  const { setIsLoading } = useLoading();
  const [trigger, setTrigger] = useState(0);
  const router = useRouter();

  const fetchData = useCallback(async () => {
    try {
      const apiResponse = await api.get(`/${endpoint}${params ? params : ""}`);

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
  }, [endpoint, params, router]);

  useEffect(() => {
    setIsLoading(true);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData()
      .then(() => console.log("Dados carregados."))
      .catch((err) => console.log((err as Error).message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

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

async function logout(router: AppRouterInstance) {
  await api.post("/login/logout");
  return router.push("/login");
}
