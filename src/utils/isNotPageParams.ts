/**
 * Verifica se o parâmetro não é de paginação.
 *
 * @param key - Valor chave do parâmetro
 * @returns boolean
 */
export const isNotPageParams = (key: string) => {
  return key !== "page" && key !== "pageSize";
};
