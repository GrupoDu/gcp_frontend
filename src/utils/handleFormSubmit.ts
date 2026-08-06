import { api } from "@/services/api";
import { Method } from "axios";

/**
 * Função para lidar com o envio de formulários
 *
 * @param endpoint - Endpoint da API
 * @param payload - Valores da requisição
 * @param method - Método da requisição
 */
export async function handleFormSubmit<T>(endpoint: string, payload: T, method: Method) {
  await handlePostRequest(method, endpoint, payload);
  await handlePutRequest(method, endpoint, payload);
}

/**
 * Função para lidar com requisições POST
 *
 * @param method - Método da requisição
 * @param endpoint - Endpoint da API
 * @param bodyValues - Valores da requisição
 */
async function handlePostRequest(method: string, endpoint: string, bodyValues: unknown) {
  if (method !== "POST") return;

  return await api.post(`/${endpoint}`, bodyValues);
}

/**
 * Função para lidar com requisições PUT
 *
 * @param method - Método da requisição
 * @param endpoint - Endpoint da API
 * @param bodyValues - Valores da requisição
 */
async function handlePutRequest(method: string, endpoint: string, bodyValues: unknown) {
  if (method !== "PUT") return;

  return await api.patch(`/${endpoint}`, bodyValues);
}
