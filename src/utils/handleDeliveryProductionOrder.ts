import { api } from "@/services/api";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "react-toastify";

export async function handleDelivery(
  e: React.FormEvent<HTMLFormElement>,
  endpoint: string,
  productionOrderBody: Record<string, unknown>,
  incrementEmployeeUpdateBody: number,
  employeeUuid: string,
  isProcessing: (processing: boolean) => void,
  redirectHref?: string,
  refetch?: () => void,
  router?: AppRouterInstance,
) {
  e.preventDefault();
  isProcessing(true);

  try {
    await api.put(`/${endpoint}`, productionOrderBody);

    await employeeUpdateActivityQuantity(employeeUuid);
    await incrementEmployeeProducedQuantity(
      employeeUuid,
      incrementEmployeeUpdateBody,
    );
    await incrementDeliveredProductionOrderAnalysis();

    if (redirectHref && router) {
      router.push(redirectHref);
      return toast.success("Entrega realizada com sucesso!");
    } else if (refetch) {
      refetch();
    }
  } catch (err) {
    isProcessing(false);
    return toast.error((err as Error).message);
  }
}

async function employeeUpdateActivityQuantity(employeeUuid: string) {
  try {
    await api.put(`/employees/activity/${employeeUuid}`);

    return toast.success("Quantidade de entregas atualizada com sucesso!");
  } catch (err) {
    return toast.error((err as Error).message);
  }
}

async function incrementEmployeeProducedQuantity(
  employeeUuid: string,
  productsQuantity: number,
) {
  try {
    await api.put(`/employees/producedQuantity/${employeeUuid}`, {
      productsQuantity,
    });
  } catch (err) {
    return toast.error((err as Error).message);
  }
}

async function incrementDeliveredProductionOrderAnalysis() {
  try {
    await api.put(`/anualAnalysis/updateAnalysis`);
  } catch (err) {
    return toast.error((err as Error).message);
  }
}
