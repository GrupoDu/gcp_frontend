export type Goal = {
  goal_id: string;
  goals?: Goal[];
  title: string;
  description: string;
  goal_status: boolean;
  goal_type: string;
  deadline: Date;
  employee_goal: string;
  created_at: string;
};
