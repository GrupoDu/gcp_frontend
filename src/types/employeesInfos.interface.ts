import { Employee } from "@/types/employee.interface";

export interface EmployeesInfos {
  welder: Employee | undefined;
  cutAssistant: Employee | undefined;
  foldAssistant: Employee | undefined;
  finishingAssistant: Employee | undefined;
  paintAssistant: Employee | undefined;
}
