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

export interface EmployeeAnalysis {
  employeeAnalysisUuid: string;
  employeeUuid: string;
  month: number;
  year: number;
  monthlyTotalProduction: number;
  mostProduced: string;
  primaryActivity: string;
  employees: Employee;
  products: Product[];
  fullProductsAnalysis: FullProductsAnalysis[] | null;
  fullActivityAnalysis: FullActivityAnalysis[] | null;
}
