import { AssistantsPORegisters } from "../types/assistantsRegister.type";
import { api } from "@/services/api";
import { debugLogger } from "@/utils/logger";
import { toast } from "react-toastify";
import { ErrorResponse } from "@/types/errorResponse.type";

export default async function handleAssistantDelivery(assistantValues: AssistantsPORegisters, refetch: () => void) {
  const { production_order_uuid, assistant_uuid, assistant_as } = assistantValues;

  try {
    if (!assistant_uuid) {
      return toast.error("Verifique se o assistente já foi selecionado para essa tarefa.");
    }
    const deliveryResponse = await api.patch("/assistants-po-registers/deliver", {
      production_order_uuid,
      assistant_uuid,
      assistant_as,
    });

    const employeeDeliveryIncrease = await api.patch(`/employees/activity/${assistant_uuid}`);

    const deliveryData = await deliveryResponse.data;
    const employeeDeliveryData = await employeeDeliveryIncrease.data;

    debugLogger(`
    ||> handleAssistantDelivery <|| 
    -----------------------------------
    deliveryData: ${JSON.stringify(deliveryData)}
    -----------------------------------
    employeeDeliveryData: ${JSON.stringify(employeeDeliveryData)}
    -----------------------------------
    `);

    refetch();
    return toast.success(deliveryData.message);
  } catch (err) {
    const error = err as ErrorResponse;
    return toast.error(`Houve um erro na requisição: ${error.response?.data.message}`);
  }
}
