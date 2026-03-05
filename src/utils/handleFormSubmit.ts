import { api } from "@/services/api";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "react-toastify";

export async function handleFormSubmit(
  e: React.FormEvent<HTMLFormElement>,
  method: string,
  bodyValues: Record<string, unknown>,
  endpoint: string,
  router?: AppRouterInstance,
  canEdit?: boolean,
) {
  e.preventDefault();

  const isEditPage = method === "PUT" && !canEdit;

  if (isEditPage) {
    router?.back();
    return toast.error("Informações não podem ser alteradas.");
  }

  console.log("Body values: ", bodyValues);

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
      await api.post(`/${endpoint}`, bodyValues);
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
