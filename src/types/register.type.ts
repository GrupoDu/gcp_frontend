export type Register = {
  register_id?: string;
  deadline: string;
  title: string;
  description: string;
  status: string;
  delivered_at?: string | null;
  employee_uuid?: string | null;
  product_uuid: string;
  deliver_observation: string;
  client_uuid: string;
  product_quantity: number;
  cut_assistant?: string | null;
  fold_assistant?: string | null;
  finishing_assistant?: string | null;
  paint_assistant?: string | null;
};
