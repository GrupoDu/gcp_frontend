import { Product } from "@/types/product.type";
import { Welder } from "@/types/welder.type";
import { Order } from "@/types/order.type";

export type ProductionOrder = {
  production_order_uuid?: string;
  production_order_deadline: Date;
  production_order_description?: string;
  production_order_status: string;
  delivered_at?: string | null;
  welders?: Welder | null;
  products: Product;
  orders: Order;
  delivery_observation: string;
  supervisor_uuid: string;
  quantity_to_produce: number;
  produced_quantity: number;
  stock_validation: boolean;
};
