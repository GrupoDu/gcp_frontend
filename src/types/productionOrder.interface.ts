import { Product } from "@/types/product.interface";
import { Welder } from "@/types/welder.interface";
import { Order } from "@/types/order.interface";
import { Status } from "@/enums/status.enum";

export interface ProductionOrder {
  productionOrderUuid?: string;
  productionOrderDeadline: string;
  productionOrderDescription?: string;
  productionOrderStatus: Status;
  productUuid: string;
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

export interface ProductionOrderPayload {
  productUuid: string;
  toBeProduced: number;
  productionOrderDeadline: Date;
}

export interface ProductionOrderEditPayload {
  toBeProduced: number;
  productionOrderDeadline: Date;
}
