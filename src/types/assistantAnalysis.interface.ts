import { Employee } from "@/types/employee.interface";

export interface Activity {
  activityType: string;
  producedQuantity: number;
}

export interface AssistantAnalysis {
  month: number;
  year: number;
  employee: Employee;
  activities: Activity[];
}

export interface AssistantAnalysisFullYear {
  month: number;
  year: number;
  monthlyProduction: number;
}
