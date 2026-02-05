import { GoalContext } from "@/context/goal.context";
import { useContext } from "react";

export function useGoal() {
  const goalData = useContext(GoalContext);

  if (goalData === undefined)
    throw new Error("useGoal deve ser usado com um Provider.");

  return goalData;
}
