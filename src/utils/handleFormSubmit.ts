import { api } from "@/services/api";
import { toast } from "react-toastify";
import { ApiConfig } from "@/types/apiConfig.interface";
import { PageConfig } from "@/types/pageConfig.interface";
import { AssistantsRegisters } from "@/types/assistantsRegister.interface";
import React from "react";
import { ErrorResponse } from "@/types/errorResponse.interface";

/**
 * Função para lidar com o envio de formulários
 *
 * @param e - event
 * @param apiConfig - Configurações da API
 * @param pageConfig - Configurações da página
 * @see ApiConfig
 * @see PageConfig
 */
export async function handleFormSubmit(
  e: React.SubmitEvent<HTMLFormElement>,
  apiConfig: ApiConfig<Record<string, unknown>>,
  pageConfig: PageConfig,
) {
  e.preventDefault();

  const { endpoint, bodyValues, method, assistantsRegister } = apiConfig;
  const { router, canEdit } = pageConfig;
  const isEditPage = method === "PUT" && !canEdit;

  if (isEditPage) {
    router?.back();
    return toast.error("Informações não podem ser alteradas.");
  }

  let deadline: string | undefined;

  if (bodyValues.productionOrderDeadline) {
    deadline = bodyValues.productionOrderDeadline.toString();
  } else if (bodyValues.goalDeadline) {
    deadline = bodyValues.goalDeadline.toString();
  }

  const isDeadlineOnPast = deadline && new Date(deadline) < new Date();

  if (isDeadlineOnPast) {
    toast.error("Data de vencimento não pode ser no passado.");
    throw new Error("Data de vencimento não pode ser no passado.");
  }

  try {
    const postResponse = await handlePostRequest(method, endpoint, bodyValues);
    const putResponse = await handlePutRequest(method, endpoint, bodyValues);
    const response = postResponse || putResponse;
    const productionOrderUuid = response?.data.data.productionOrderUuid;

    // Só cria o registro de atividade de assistente se assistantsRegister existir
    createAssistantPORegister(productionOrderUuid, assistantsRegister);

    router?.back();
    return toast.success("Operação realizada com sucesso!");
  } catch (err) {
    const error = err as ErrorResponse;
    console.log(error);
    return toast.error(error.response?.data.message);
  }
}

/**
 * Método para criar registros de atividades de assistentes
 *
 * @param assistantsRegisters - Informações da atividade do assistente
 * @param productionOrderId - UUID da produção
 */
function createAssistantPORegister(productionOrderId: string, assistantsRegisters?: AssistantsRegisters[]) {
  if (!assistantsRegisters) return;

  try {
    assistantsRegisters.forEach(async (assistant) => {
      await api.post("/assistants-po-register", {
        productionOrderUuid: productionOrderId,
        assistantUuid: assistant.assistantUuid,
        assistantAs: assistant.assistantAs,
      });
    });
  } catch (err) {
    const error = err as Error;
    console.log("Houve um erro: ", error);
  }
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

  try {
    return await api.post(`/${endpoint}`, bodyValues);
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
    return undefined;
  }
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

  try {
    return await api.patch(`/${endpoint}`, bodyValues);
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
    return undefined;
  }
}
