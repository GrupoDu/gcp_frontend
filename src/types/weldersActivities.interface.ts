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
  employee: Employee;
  product: Product;
}

type OmitFields = "welderActivityUuid" | "registeredAt" | "employee" | "product";

export interface WelderActivityPayload extends Omit<WeldersActivities, OmitFields> {}

export interface WeldersActivitiesPagination {
  weldersActivities: WeldersActivities[];
  maxPages: number;
}
