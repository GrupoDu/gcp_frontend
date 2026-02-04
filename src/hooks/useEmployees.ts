import { EmployeeContext } from "@/context/employeeContext";
import { useContext } from "react";

export function useEmployees() {
  const employeesContext = useContext(EmployeeContext);

  if (employeesContext === undefined)
    throw new Error("useEmployee deve ser usado com um Provider.");

  return employeesContext;
}
