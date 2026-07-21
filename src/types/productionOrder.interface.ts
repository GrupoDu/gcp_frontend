import { Product } from "@/types/product.interface";
import { Welder } from "@/types/welder.interface";
import { Order } from "@/types/order.interface";

export interface ProductionOrder {
  productionOrderUuid?: string;
  productionOrderDeadline: Date;
  productionOrderDescription?: string;
  productionOrderStatus: string;
  deliveredAt?: string | null;
  welders?: Welder | null;
  product: Product;
  order: Order;
  deliveryObservation: string;
  supervisorUuid: string;
  toBeProduced: number;
  producedQuantity: number;
  stockValidation: boolean;
}
