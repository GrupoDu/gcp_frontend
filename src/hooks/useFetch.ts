"use client";

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
  const API_URL = process.env.NEXT_PUBLIC_API_URL_HTTP;

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/${endpoint}${params ? params : ""}`, {
        method: "GET",
        credentials: "include",
      });

      if (response.status === 403) {
        router.back();
        return toast.warning("Sessão expirada ou credenciais inválidas.");
      }

      const data = await response.json();

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
      setFetchedData({
        status: "failed",
        err: (err as Error).message,
      });

      router.push("/login");
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
