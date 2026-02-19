import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "react-toastify";

export async function handleDeliver(
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

  console.log("=== START DEBUG handleDeliver ===");
  console.log("body values: ", productionOrderBody);
  console.log("produced quantity: ", incrementEmployeeUpdateBody);
  console.log("employee uuid: ", employeeUuid);
  console.log("=== END DEBUG handleDeliver ===");

  try {
    const responseUpdateRegister = await fetch(
      `http://localhost:8000/${endpoint}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(productionOrderBody),
      },
    );

    if (!responseUpdateRegister.ok) {
      throw new Error("Erro ao realizar entrega.");
    }    

    const data = await responseUpdateRegister.json();
    console.log(data);

    await employeeUpdateActivityQuantity(employeeUuid);
    await incrementEmployeeProducedQuantity(employeeUuid, incrementEmployeeUpdateBody);

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
    const updateEmployeeActivity = await fetch(
      `http://localhost:8000/employees/activity/${employeeUuid}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
    );

    if (!updateEmployeeActivity.ok) {
      throw new Error("Erro ao atualizar quantidade de entregas.");
    }

    const data = await updateEmployeeActivity.json();
    console.log(data);

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
    const updateEmployeeActivity = await fetch(
      `http://localhost:8000/employees/producedQuantity/${employeeUuid}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          productsQuantity,
        }),
      },
    );

    if (!updateEmployeeActivity.ok) {
      throw new Error("Erro ao atualizar quantidade de entregas.");
    }

    const data = await updateEmployeeActivity.json();
    console.log(data);
  } catch (err) {
    return toast.error((err as Error).message);
  }
}
