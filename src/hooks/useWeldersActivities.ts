import { useContext } from "react";
import { WeldersActivitiesContext } from "@/context/weldersActivities.context";

export const useWeldersActivities = () => {
  const context = useContext(WeldersActivitiesContext);

  if (!context) throw new Error("useWeldersActivities deve ser usado com provider");

  return context;
};
