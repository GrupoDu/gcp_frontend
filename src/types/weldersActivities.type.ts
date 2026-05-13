import { Employee } from "@/types/employee.type";
import { Product } from "@/types/product.type";

export interface WeldersActivities {
  welder_activity_uuid: string;
  welder_uuid: string;
  product_uuid: string;
  produced_quantity: number;
  registered_at: Date;
  employees: Employee;
  products: Product;
}
