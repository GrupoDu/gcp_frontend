export interface Goal {
  goalUuid?: string;
  goalTitle: string;
  goalDescription: string;
  goalStatus?: string;
  isEmployeeGoal?: boolean;
  goalDeadline: string;
  employeeUuid: string | null;
  createdAt?: string;
}

export interface GoalPayload extends Omit<Goal, "goalUuid" | "createdAt" | "goalStatus"> {}
