import { Employee } from "@/types/employee.type";

export function getEmployeeRoles(employees: Employee[] | undefined) {
  const welders = employees?.filter((employee) => employee.employee_role === "soldador");
  const assistants = employees?.filter((employee) => employee.employee_role === "assistentes");

  return { welders, assistants };
}
