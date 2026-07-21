import { api } from "@/services/api";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "react-toastify";
import { ErrorResponse } from "@/types/errorResponse.type";
import React from "react";

/**
 * Função para lidar com a entrega de uma produção
 *
 * @param e - event
 * @param endpoint - Endpoint da API
 * @param productionOrderBody - Valores a serem enviados
 * @param incrementEmployeeUpdateBody - Valores para incrementar produção do funcionário
 * @param employeeUuid - UUID do funcionádio
 * @param isProcessing - Boleano para controlar o processamento
 * @param redirectHref - href para redirecionar ao final do processo
 * @param refetch - Função para recarregar os dados
 * @param router - Instancia do router
 */
export async function handleDelivery(
  e: React.SubmitEvent<HTMLFormElement>,
  endpoint: string,
  productionOrderBody: Record<string, unknown>,
  incrementEmployeeUpdateBody: number,
  employeeUuid: string,
  isProcessing: (processing: boolean) => void,
  redirectHref?: string,
  router?: AppRouterInstance,
  refetch?: () => void,
) {
  e.preventDefault();
  isProcessing(true);

  try {
    await api.patch(`/${endpoint}`, productionOrderBody);

    await incrementDeliveredProductionOrderAnalysis(productionOrderBody.product_quantity as number);

    if (redirectHref && router) {
      router.push(redirectHref);
      return toast.success("Entrega realizada com sucesso!");
    } else if (refetch) {
      refetch();
    }
  } catch (err) {
    const error = err as ErrorResponse;
    isProcessing(false);
    return toast.error(error.response?.data.message);
  }
}

async function incrementDeliveredProductionOrderAnalysis(deliveredQuantity: number) {
  try {
    await api.patch(`/anual-analysis/update-analysis`, {
      deliveredQuantity,
    });
  } catch (err) {
    const error = err as Error;
    return toast.error(error.message);
  }
}
