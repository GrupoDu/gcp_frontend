export type ProductionOrder = {
  production_order_uuid?: string;
  production_order_deadline: Date;
  production_order_description?: string;
  production_order_status: string;
  delivered_at?: string | null;
  welder_uuid?: string | null;
  product_uuid: string;
  delivery_observation: string;
  supervisor_uuid: string;
  quantity_to_produce: number;
  produced_quantity: number;
  stock_validation: boolean;
};
