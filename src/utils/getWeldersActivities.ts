import { WeldersActivities } from "@/types/weldersActivities.type";
import { toast } from "react-toastify";
import { api } from "@/services/api";

async function getWeldersActivities(): Promise<WeldersActivities[] | undefined> {
  try {
    const response = await api.get("/welders-activities");
    return response.data.data as WeldersActivities[];
  } catch (err) {
    const error = err as Error;
    toast.error(error.message);
    return undefined;
  }
}

export default getWeldersActivities;
