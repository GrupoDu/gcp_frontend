import { Employee } from "@/types/employee.interface";
import { createContext } from "react";

type EmployeeContextValues = {
  employees: Employee[] | undefined;
  status: string | undefined;
  err: string | undefined;
  refetch: () => void;
};

export const EmployeeContext = createContext<EmployeeContextValues | undefined>(undefined);
