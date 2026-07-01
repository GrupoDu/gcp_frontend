import { Employee } from "@/types/employee.type";
import { Product } from "@/types/product.type";

export interface WeldersActivities {
  welder_activity_uuid: string;
  welder_uuid: string;
  product_uuid?: string | null;
  description_general_activity?: string | null;
  is_general_activity: boolean;
  produced_quantity: number;
  registered_at: Date;
  employees: Employee;
  products: Product;
}

export interface WeldersActivitiesPagination {
  weldersActivities: WeldersActivities[];
  max_pages: number;
}
