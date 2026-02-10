import { NextRouter } from "next/router";
import { toast } from "react-toastify";

export async function handleFormSubmit(
  e: React.FormEvent<HTMLFormElement>,
  method: string,
  bodyValues: Record<string, unknown>,
  endpoint: string,
  redirectHref: string,
  endpointParams?: string,
) {
  e.preventDefault();

  const fullEndpointName = endpointParams
    ? `${endpoint}/${endpointParams}`
    : endpoint;

  try {
    const response = await fetch(`http://localhost:8000/${fullEndpointName}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(bodyValues),
    });

    // window.location.href = redirectHref;
    return toast.success("Operação realizada com sucesso!");
  } catch (err) {
    toast.error((err as Error).message);
  }
}
