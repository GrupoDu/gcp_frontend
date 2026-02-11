import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "react-toastify";

export async function handleFormSubmit(
  e: React.FormEvent<HTMLFormElement>,
  method: string,
  bodyValues: Record<string, unknown>,
  endpoint: string,
  redirectHref: string,
  router?: AppRouterInstance,
) {
  e.preventDefault();

  try {
    const response = await fetch(`http://localhost:8000/${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(bodyValues),
    });

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
