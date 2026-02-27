export type ProductionOrder = {
  production_order_id?: string;
  production_order_deadline: string;
  production_order_title: string;
  production_order_description: string;
  production_order_status: string;
  delivered_at?: string | null;
  employee_uuid?: string | null;
  product_uuid: string;
  delivery_observation: string;
  client_uuid: string;
  product_quantity: number;
  cut_assistant?: string | null;
  fold_assistant?: string | null;
  finishing_assistant?: string | null;
  paint_assistant?: string | null;
};
