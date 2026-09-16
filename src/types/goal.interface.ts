export interface Goal {
  uuid?: string;
  title: string;
  description: string;
  status?: string;
  isEmployeeGoal?: boolean;
  deadline: string;
  employeeUuid: string | null;
  createdAt?: string;
}

export interface GoalPayload extends Omit<Goal, "uuid" | "createdAt" | "status"> {}
