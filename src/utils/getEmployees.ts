import { api } from "@/services/api";
import { toast } from "react-toastify";
import { Employee } from "@/types/employee.type";

type EmployeesTypeProps = {
  employees: Employee[] | undefined;
  welders: Employee[] | undefined;
  assistants: Employee[] | undefined;
};

async function getEmployees(): Promise<EmployeesTypeProps> {
  try {
    const response = await api.get("/employees");
    const employees: Employee[] | undefined = response.data.data;
    const welders: Employee[] | undefined = employees?.filter((employee) => employee.employee_role === "soldador");
    const assistants: Employee[] | undefined = employees?.filter((employee) => employee.employee_role === "assistente");

    return { employees, welders, assistants };
  } catch (err) {
    const error = err as Error;
    toast.error(error.message);
    return { employees: undefined, welders: undefined, assistants: undefined };
  }
}

export default getEmployees;
