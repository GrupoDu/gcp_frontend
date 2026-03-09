import { Employee } from "@/types/employee.type";
import { createContext } from "react";

type EmployeeContextValues = {
  employeesData: Employee[] | undefined;
  status: string | undefined;
  err: string | undefined;
  refetch: () => void;
};

export const EmployeeContext = createContext<EmployeeContextValues | undefined>(undefined);
