import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "react-toastify";

export async function handleFormSubmit(
  e: React.FormEvent<HTMLFormElement>,
  method: string,
  bodyValues: Record<string, unknown>,
  endpoint: string,
  redirectHref: string,
  router?: AppRouterInstance,
  canEdit?: boolean,
) {
  e.preventDefault();

  console.log("Método: ", method);
  console.log("Pode editar: ", canEdit);

  if (method === "PUT" && !canEdit) {
    router?.push(redirectHref);
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
    const response = await fetch(`http://localhost:8000/${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(bodyValues),
    });

    if (!response.ok) {
      throw new Error("Erro ao realizar operação.");
    }

    console.log("=== START DEBUG handleFormSubmit ===");
    console.log("Body values: ", bodyValues);
    console.log("method: ", method);
    console.log("redirectHref: ", redirectHref);
    console.log("endpoint: ", endpoint);
    console.log("=== END DEBUG handleFormSubmit ===");

    router?.push(redirectHref);
    return toast.success("Operação realizada com sucesso!");
  } catch (err) {
    return toast.error((err as Error).message);
  }
}
