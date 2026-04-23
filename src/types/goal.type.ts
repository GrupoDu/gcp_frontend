export type Goal = {
  goal_uuid?: string;
  goal_title: string;
  goal_description: string;
  goal_status?: string;
  goal_type?: string;
  goal_deadline: string;
  employee_goal: string | null;
  created_at?: string;
};
