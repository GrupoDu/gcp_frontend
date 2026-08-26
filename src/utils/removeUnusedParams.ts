import { QueryType } from "@/types/queryType.interface";

/**
 * Remove os queryParams que não são utilizados ou estão vazios
 *
 * @param query - Objeto QueryType
 * @see QueryType
 */
export const removeUnusedParams = (query: QueryType) => {
  if (query.value === "") query.searchParams.delete(query.key);
};
