"use client";

import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";

type FetchResponse<T> = {
  status: string;
  data?: T;
  err?: string;
};

export function useFetch<T>(endpoint: string, params?: string) {
  const [fetchedData, setFetchedData] = useState<FetchResponse<T>>();
  const [trigger, setTrigger] = useState(0);
  const router = useRouter();

  const fetchData = useCallback(async () => {
    try {
      const response = await api.get(`/${endpoint}${params ? params : ""}`);

      if (response.status === 403 || response.status === 401) {
        await api.post("/login/logout");
        router.push("/login");
        return toast.warning("Sessão expirada ou credenciais inválidas.");
      }

      const data = await response.data;

      if (!data) {
        setFetchedData({
          status: "failed",
          err: "Dados não encontrados.",
        });

        return;
      }

      setFetchedData({
        status: "success",
        data: data,
      });
    } catch (err) {
      const error = err as Error;
      setFetchedData({
        status: "failed",
        err: error.message,
      });

      router.push("/login");
      await api.post("/login/logout");
      return toast.warning("Sessão expirada ou credenciais inválidas.");
    }
  }, [endpoint, params, router]);

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
