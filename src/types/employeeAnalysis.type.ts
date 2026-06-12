import { Employee } from "@/types/employee.type";
import { Product } from "@/types/product.type";

type FullProductsAnalysis = {
  product: Product;
  total_quantity: number;
};

type FullActivityAnalysis = {
  activity_name: string;
  count: number;
};

export interface EmployeeAnalysis {
  employee_analysis_uuid: string;
  employee_uuid: string;
  month: number;
  year: number;
  monthly_total_production: number;
  most_produced: string;
  primary_activity: string;
  employees: Employee;
  products: Product[];
  full_products_analysis: FullProductsAnalysis[] | null;
  full_activity_analysis: FullActivityAnalysis[] | null;
}
