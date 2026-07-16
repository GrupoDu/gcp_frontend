import { Employee } from "@/types/employee.interface";
import { useFetch } from "./useFetch";
import { useEffect, useState } from "react";

export function useEmployeeRole() {
  const { data: employeesData } = useFetch<Employee[]>("employees");
  const [welders, setWelder] = useState<Employee[]>();
  const [assistants, setAssistants] = useState<Employee[]>();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setWelder(employeesData?.filter((employee) => employee.employeeRole === "soldador"));
    setAssistants(employeesData?.filter((employee) => employee.employeeRole === "assistente"));
  }, [employeesData]);

  return { welders, assistants };
}
