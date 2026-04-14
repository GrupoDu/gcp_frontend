import useAssistantsPORegister from "@/hooks/useAssistantsPORegister";
import { useFetch } from "@/hooks/useFetch";
import { ProductionOrder } from "@/types/productionOrder.type";
import { AssistantsPORegisters } from "@/types/assistantsPORegister.type";

type AssistantsHook = {
  cut_assistant: AssistantsPORegisters | undefined;
  fold_assistant: AssistantsPORegisters | undefined;
  paint_assistant: AssistantsPORegisters | undefined;
  finishing_assistant: AssistantsPORegisters | undefined;
};

/**
 * Custom hook para buscar os ajudantes de um registro de produção
 *
 * @param {string} production_order_id - id do registro de produção
 * @returns {AssistantsHook} - Objeto com os ajudantes selecionados
 * @see {useAssistantsPORegister}
 * @see {useFetch}
 * @see {AssistantsHook}
 */
export default function useAssistants(production_order_id: string): AssistantsHook {
  const { assistantsPORegisters } = useAssistantsPORegister();
  const { data: productionOrder } = useFetch<ProductionOrder>("production-orders/", production_order_id);

  return {
    cut_assistant: assistantsPORegisters?.find(
      (assistant) =>
        assistant.assistant_as === "Corte" && assistant.production_order_uuid === productionOrder?.production_order_id,
    ),
    fold_assistant: assistantsPORegisters?.find(
      (assistant) =>
        assistant.assistant_as === "Dobra" && assistant.production_order_uuid === productionOrder?.production_order_id,
    ),
    paint_assistant: assistantsPORegisters?.find(
      (assistant) =>
        assistant.assistant_as === "Pintura" &&
        assistant.production_order_uuid === productionOrder?.production_order_id,
    ),
    finishing_assistant: assistantsPORegisters?.find(
      (assistant) =>
        assistant.assistant_as === "Acabamento" &&
        assistant.production_order_uuid === productionOrder?.production_order_id,
    ),
  };
}
