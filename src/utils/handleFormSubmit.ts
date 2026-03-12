import { api } from "@/services/api";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "react-toastify";
import { ApiConfig } from "@/types/apiConfig.type";
import { router } from "next/client";
import { PageConfig } from "@/types/pageConfig.type";
import { usePathname } from "next/navigation";
import { AssistantsPORegisters } from "@/types/assistantsPORegister.type";
import { debugLogger } from "@/utils/logger";
import { throws } from "node:assert";

export async function handleFormSubmit(
  e: React.FormEvent<HTMLFormElement>,
  apiConfig: ApiConfig,
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

  if (bodyValues.production_order_deadline) {
    deadline = bodyValues.production_order_deadline.toString();
  } else if (bodyValues.goal_deadline) {
    deadline = bodyValues.goal_deadline.toString();
  }

  if (deadline && new Date(deadline) < new Date()) {
    toast.error("Data de vencimento não pode ser no passado.");
    throw new Error("Data de vencimento não pode ser no passado.");
  }

  try {
    if (method === "POST") {
      const postResponse = await api.post(`/${endpoint}`, bodyValues);
      if (assistantsRegister) {
        console.log(postResponse.data.register.production_order_id);
        createAssistantPORegister(assistantsRegister, postResponse.data.register.production_order_id);
      }
    }

    if (method === "PUT") {
      await api.put(`/${endpoint}`, bodyValues);
    }

    router?.back();
    return toast.success("Operação realizada com sucesso!");
  } catch (err) {
    const error = err as Error;

    return toast.error(error.message);
  }
}

function createAssistantPORegister(assistantsRegisters: AssistantsPORegisters[], productionOrderId: string) {
  try {
    assistantsRegisters.forEach(async (assistant) => {
      await api.post("/assistantsPORegisters", {
        production_order_uuid: productionOrderId,
        assistant_uuid: assistant.assistant_uuid,
        assistant_as: assistant.assistant_as,
      });
    });
  } catch (err) {
    const error = err as Error;
    throw new Error("Houve um erro: ", error);
  }
}
