import { AssistantsPORegisters } from "@/types/assistantsPORegister.type";
import { api } from "@/services/api";
import { debugLogger } from "@/utils/logger";
import { toast } from "react-toastify";

export default async function handleAssistantDelivery(assistantValues: AssistantsPORegisters, refetch: () => void) {
  const { production_order_uuid, assistant_uuid, assistant_as } = assistantValues;

  try {
    const deliveryResponse = await api.put("/assistantsPORegisters/deliver", {
      production_order_uuid,
      assistant_uuid,
      assistant_as,
    });

    const employeeDeliveryIncrease = await api.put(`/employees/activity/${assistant_uuid}`);

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
    const error = err as Error;
    return toast.error(`Houve um erro na requisição: ${error.message}`);
  }
}
