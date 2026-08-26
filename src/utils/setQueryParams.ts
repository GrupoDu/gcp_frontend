import { QueryType } from "@/types/queryType.interface";
import { removeUnusedParams } from "@/utils/removeUnusedParams";
import { getSearchParams } from "@/utils/getSearchParams";

/**
 * Adiciona uma valor as queryParams
 *
 * @param query - objeto QueryType
 * @returns string - string com os queryParams
 * @see QueryType
 */
export const setQueryParams = (query: QueryType) => {
  const params = getSearchParams(query.searchParams);

  params.set(query.key, query.value);

  removeUnusedParams({ searchParams: params, key: query.key, value: query.value });

  return params.toString();
};
