import { Employee } from "@/types/employee.interface";

export function getEmployeeRoles(employees: Employee[] | undefined) {
  const welders = employees?.filter((employee) => employee.role === "Soldador");
  const assistants = employees?.filter((employee) => employee.role === "Assistente");

  return { welders, assistants };
}
