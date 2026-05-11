import useAssistantsRegister from "./useAssistantsRegister";
import { useFetch } from "@/hooks/useFetch";
import { ProductionOrder } from "@/types/productionOrder.type";
import { AssistantsRegisters } from "@/types/assistantsRegister.type";

type AssistantsHook = {
  cut_assistant: AssistantsRegisters | undefined;
  fold_assistant: AssistantsRegisters | undefined;
  paint_assistant: AssistantsRegisters | undefined;
  finishing_assistant: AssistantsRegisters | undefined;
};

/**
 * Custom hook para buscar os ajudantes de um registro de produção
 *
 * @param {string} production_order_uuid - id do registro de produção
 * @returns {AssistantsHook} - Objeto com os ajudantes selecionados
 * @see {useAssistantsPORegister}
 * @see {useFetch}
 * @see {AssistantsHook}
 */
export default function useAssistants(production_order_uuid: string): AssistantsHook {
  const { assistantsRegisters } = useAssistantsRegister();
  const { data: productionOrder } = useFetch<ProductionOrder>("production-orders/", production_order_uuid);

  return {
    cut_assistant: assistantsRegisters?.find(
      (assistant) =>
        assistant.assistant_as === "Corte" &&
        assistant.production_order_uuid === productionOrder?.production_order_uuid,
    ),
    fold_assistant: assistantsRegisters?.find(
      (assistant) =>
        assistant.assistant_as === "Dobra" &&
        assistant.production_order_uuid === productionOrder?.production_order_uuid,
    ),
    paint_assistant: assistantsRegisters?.find(
      (assistant) =>
        assistant.assistant_as === "Pintura" &&
        assistant.production_order_uuid === productionOrder?.production_order_uuid,
    ),
    finishing_assistant: assistantsRegisters?.find(
      (assistant) =>
        assistant.assistant_as === "Acabamento" &&
        assistant.production_order_uuid === productionOrder?.production_order_uuid,
    ),
  };
}
