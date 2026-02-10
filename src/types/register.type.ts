export type Register = {
  register_id: string;
  deadline: string;
  title: string;
  description: string;
  status: string;
  delivered_at: string;
  employee_uuid: string;
  product_uuid: string;
  deliver_observation: string;
  client_uuid: string;
  product_quantity: number;
  cut_assistant?: string;
  fold_assistant?: string;
  finishing_assistant?: string;
  paint_assistant?: string;
};
