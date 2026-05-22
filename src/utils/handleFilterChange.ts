import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams } from "next/navigation";

/**
 * Atualiza searchParam de filtro
 *
 * @param router {AppRouterInstance} - Instância do router
 * @param setValue {(value: string) => void} - setState do valor do filtro
 * @param searchParams {ReadonlyURLSearchParams} - Parâmetros da URL
 * @param filterValue {string} - Valor do filtro
 * @param newValue {string} - Valor a ser atualizado
 * @param paramTarget {string} - parâmetro a ser atualizado
 */
export const handleFilterChange = (
  router: AppRouterInstance,
  setValue: (value: string) => void,
  searchParams: ReadonlyURLSearchParams,
  filterValue: string,
  newValue: string,
  paramTarget: string,
) => {
  const pathname = document.location.pathname;
  setValue(newValue);
  const params = new URLSearchParams(`${searchParams.toString()}`);
  params.set(paramTarget, filterValue);
  router.push(`${pathname}?${params.toString()}`);
};
