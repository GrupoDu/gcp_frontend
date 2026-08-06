import { AssistantsRegisters } from "@/types/assistantsRegister.interface";
import { api } from "@/services/api";
import { toast } from "react-toastify";
import { ErrorResponse } from "@/types/errorResponse.interface";

export default async function handleAssistantDelivery(assistantValues: AssistantsRegisters, refetch: () => void) {
  const { productionOrderUuid, assistantUuid, assistantAs } = assistantValues;

  try {
    if (!assistantUuid) {
      return toast.error("Verifique se o assistente já foi selecionado para essa tarefa.");
    }
    const deliveryResponse = await api.patch("/assistants-po-registers/deliver", {
      productionOrderUuid,
      assistantUuid,
      assistantAs,
    });

    const employeeDeliveryIncrease = await api.patch(`/employee/activity/${assistantUuid}`);

    const deliveryData = await deliveryResponse.data;
    const employeeDeliveryData = await employeeDeliveryIncrease.data;

    refetch();
    return toast.success(deliveryData.message);
  } catch (err) {
    const error = err as ErrorResponse;
    return toast.error(`Houve um erro na requisição: ${error.response?.data.message}`);
  }
}
