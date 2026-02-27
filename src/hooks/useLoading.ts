import { LoadingContext } from "@/context/loading.context";
import { useContext } from "react";

export function useLoading() {
  const loadingContext = useContext(LoadingContext);

  if (loadingContext === undefined) {
    throw new Error("useLoading deve ser usado com um Provider.");
  }

  return loadingContext;
}
