import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams } from "next/navigation";
import React from "react";
import { debugLogger } from "@/utils/logger";

/**
 * Atualiza searchParam de filtro
 *
 * @param router {AppRouterInstance} - Instância do router
 * @param setValue {(value: string) => void} - setState do valor do filtro
 * @param searchParams {ReadonlyURLSearchParams} - Parâmetros da URL
 * @param filterValue {string} - Valor do filtro
 * @param newValue {string} - Valor a ser atualizado
 * @param paramTarget {string} - parâmetro a ser atualizado
 * @param ref {React.RefObject} - Referência ao valor do filtro
 */
export const handleFilterChange = (
  router: AppRouterInstance,
  setValue: (value: string) => void,
  searchParams: ReadonlyURLSearchParams,
  ref: React.RefObject<string>,
  newValue: string,
  paramTarget: string,
) => {
  const pathname = document.location.pathname;
  ref.current = newValue;
  setValue(newValue);
  const params = new URLSearchParams(`${searchParams.toString()}`);

  params.set(paramTarget, ref.current);
  router.push(`${pathname}?${params.toString()}`);
};
