/**
 * Retorna os parâmetros de busca
 *
 * @param searchParams - Instância de URLSearchParams
 */
export const getSearchParams = (searchParams: URLSearchParams) => {
  return new URLSearchParams(searchParams.toString());
};
