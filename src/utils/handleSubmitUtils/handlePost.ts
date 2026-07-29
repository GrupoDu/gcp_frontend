import { toast } from "react-toastify";
import { api } from "@/services/api";

export async function handlePost<T>(payload: T, endpoint: string) {
  try {
    await api.post(endpoint, payload);
    return true;
  } catch (e) {
    const err = e as Error;
    toast.error(err.message.replace("Houve um erro: ", ""));
    return false;
  }
}
