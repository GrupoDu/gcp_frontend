"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";

type FetchResponse<T> = {
  status: string;
  data?: T;
  err?: string;
};

export function useFetch<T>(url: string, params?: string) {
  const [fetchedData, setFetchedData] = useState<FetchResponse<T>>();
  const [trigger, setTrigger] = useState(0);
  const router = useRouter();

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`${url}${params ? params : ""}`, {
        method: "GET",
        credentials: "include",
      });

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
  }, [url, params, router]);

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
