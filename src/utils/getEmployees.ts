import { api } from "@/services/api";
import { toast } from "react-toastify";
import { Employee } from "@/types/employee.interface";

type EmployeesTypeProps = {
  employees: Employee[] | undefined;
  welders: Employee[] | undefined;
  assistants: Employee[] | undefined;
};

async function getEmployees(): Promise<EmployeesTypeProps> {
  try {
    const response = await api.get("/employee");
    const employees: Employee[] | undefined = response.data.data;
    const welders: Employee[] | undefined = employees?.filter((employee) => employee.employeeRole === "Soldador");
    const assistants: Employee[] | undefined = employees?.filter((employee) => employee.employeeRole === "Assistente");

    return { employees, welders, assistants };
  } catch (err) {
    const error = err as Error;
    toast.error(error.message);
    return { employees: undefined, welders: undefined, assistants: undefined };
  }
}

export default getEmployees;
