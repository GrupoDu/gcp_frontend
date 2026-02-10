export type Goal = {
  goal_id?: string;
  title: string;
  description: string;
  goal_status?: string;
  goal_type?: string;
  deadline: string;
  employee_goal: string | null;
  created_at?: string;
};
