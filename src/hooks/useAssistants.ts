import useAssistantsRegister from "./useAssistantsRegister";
import { useFetch } from "@/hooks/useFetch";
import { ProductionOrder } from "@/types/productionOrder.interface";
import { AssistantsRegisters } from "@/types/assistantsRegister.interface";

type AssistantsHook = {
  cut_assistant: AssistantsRegisters | undefined;
  fold_assistant: AssistantsRegisters | undefined;
  paint_assistant: AssistantsRegisters | undefined;
  finishing_assistant: AssistantsRegisters | undefined;
};

/**
 * Custom hook para buscar os ajudantes de um registro de produção
 *
 * @returns {AssistantsHook} - Objeto com os ajudantes selecionados
 * @see {useFetch}
 * @see {AssistantsHook}
 * @param productionOrderUuid
 */
export default function useAssistants(productionOrderUuid: string): AssistantsHook {
  const { assistantsRegisters } = useAssistantsRegister();
  const { data: productionOrder } = useFetch<ProductionOrder>("productionOrder/", productionOrderUuid);

  return {
    cut_assistant: assistantsRegisters?.find(
      (assistant) =>
        assistant.assistantAs === "Corte" && assistant.productionOrderUuid === productionOrder?.productionOrderUuid,
    ),
    fold_assistant: assistantsRegisters?.find(
      (assistant) =>
        assistant.assistantAs === "Dobra" && assistant.productionOrderUuid === productionOrder?.productionOrderUuid,
    ),
    paint_assistant: assistantsRegisters?.find(
      (assistant) =>
        assistant.assistantAs === "Pintura" && assistant.productionOrderUuid === productionOrder?.productionOrderUuid,
    ),
    finishing_assistant: assistantsRegisters?.find(
      (assistant) =>
        assistant.assistantAs === "Acabamento" &&
        assistant.productionOrderUuid === productionOrder?.productionOrderUuid,
    ),
  };
}
