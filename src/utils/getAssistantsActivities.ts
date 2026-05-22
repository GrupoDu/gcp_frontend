import { AssistantsActivities } from "@/types/assistantsActivities.types";
import { toast } from "react-toastify";
import { api } from "@/services/api";

async function getAssistantsActivities(): Promise<AssistantsActivities[] | undefined> {
  try {
    const response = await api.get("/assistants-activities");
    return response.data.data as AssistantsActivities[];
  } catch (err) {
    const error = err as Error;
    toast.error(error.message);
    return undefined;
  }
}

export default getAssistantsActivities;
