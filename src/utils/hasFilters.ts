import { isNotPageParams } from "@/utils/isNotPageParams";

/**
 * Verifica se os parâmetros de busca contêm filtros além dos parâmetros de paginação.
 *
 * @param searchParams - Instância de URLSearchParams
 * @returns boolean indicando se há filtros ativos
 */
export const hasFilters = (searchParams: URLSearchParams) => {
  return Array.from(searchParams.keys()).some((key) => isNotPageParams(key));
};
