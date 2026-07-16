import { Employee } from "@/types/employee.interface";

export function getEmployeeRoles(employees: Employee[] | undefined) {
  const welders = employees?.filter((employee) => employee.employeeRole === "Soldador");
  const assistants = employees?.filter((employee) => employee.employeeRole === "Assistente");

  return { welders, assistants };
}
