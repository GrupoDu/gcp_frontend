import { Employee } from "@/types/employee.interface";
import { Product } from "@/types/product.interface";

export interface WeldersActivities {
  welderActivityUuid: string;
  welderUuid: string;
  productUuid?: string | null;
  descriptionGeneralActivity?: string | null;
  isGeneralActivity: boolean;
  producedQuantity: number;
  registeredAt: Date;
  employees: Employee;
  products: Product;
}

export interface WeldersActivitiesPagination {
  weldersActivities: WeldersActivities[];
  maxPages: number;
}
