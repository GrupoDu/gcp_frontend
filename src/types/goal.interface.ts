export interface Goal {
  goalUuid?: string;
  goalTitle: string;
  goalDescription: string;
  goalStatus?: string;
  goalType?: string;
  goalDeadline: string;
  employeeGoal: string | null;
  createdAt?: string;
}
