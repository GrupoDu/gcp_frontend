import { isNotPageParams } from "@/utils/isNotPageParams";

type CreateParamsString = {
  paramsString: string;
  hasParams: boolean;
};

/**
 * Cria a string com os query params.
 * @param params o objeto URLSearchParams para usar o params.
 * @returns Um objeto com a string montada e um booleano indicando se há params.
 */
export const createParamsString = (params: URLSearchParams): CreateParamsString => {
  let paramsString = "";
  let hasParams = false;

  params.forEach((value, key) => {
    hasParams = isNotPageParams(key);
    const paramValueIsEmpty = value.trim() === "";

    if (paramValueIsEmpty) return;

    paramsString += mountParamsString(value, key, paramsString);
  });

  return {
    paramsString,
    hasParams,
  };
};

/**
 * Monta a string com os query params.
 *
 * @param value - Valor do param
 * @param key - Valor chave do parâmetro
 * @param paramsString - String com os parâmetros. Usado apenas para verificar se é o primeiro parâmetro.
 * @returns string
 */
function mountParamsString(value: string, key: string, paramsString: string) {
  const isFirstParam = paramsString.length > 1;

  if (isFirstParam) {
    return `&${key}=${value}`;
  } else {
    return `${key}=${value}`;
  }
}
