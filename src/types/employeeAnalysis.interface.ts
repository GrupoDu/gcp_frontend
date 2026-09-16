import { Employee } from "@/types/employee.interface";
import { Product } from "@/types/product.interface";

interface FullProductsAnalysis {
  product: Product | null;
  totalQuantity: number;
}

interface FullActivityAnalysis {
  activityName: string;
  count: number;
}

interface Activity {
  type: string;
  producedQuantity: number;
}

export interface EmployeeAnalysisEmployeeInfo {
  uuid: string;
  name: string;
  role: string;
  producedQuantity: number;
}

export interface ProductActivity {
  name: string;
  acronym: string;
  totalProduction: number;
}

export interface EmployeeAnalysisFullYear {
  month: number;
  monthlyProduction: number;
}

export interface EmployeeAnalysis {
  month: number;
  year: number;
  employee: EmployeeAnalysisEmployeeInfo;
  generalActivity: number;
  activities: Activity[];
  productActivity: ProductActivity[];
  monthlyTotalProduction: number;
}
