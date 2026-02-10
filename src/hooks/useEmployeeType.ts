import { Employee } from "@/types/employee.type";
import { useFetch } from "./useFetch";
import { useEffect, useState } from "react";

export function useEmployeeType() {
  const { data: employeesData } = useFetch<Employee[]>(
    "http://localhost:8000/employees",
  );
  const [welders, setWelder] = useState<Employee[]>();
  const [assistants, setAssistants] = useState<Employee[]>();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setWelder(
      employeesData?.filter(
        (employee) => employee.employee_type === "soldador",
      ),
    );
    setAssistants(
      employeesData?.filter(
        (employee) => employee.employee_type === "assistente",
      ),
    );
  }, [employeesData]);

  return { welders, assistants };
}
