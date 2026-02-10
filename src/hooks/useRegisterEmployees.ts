import { Employee } from "@/types/employee.type";
import { useFetch } from "./useFetch";
import { Register } from "@/types/register.type";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function useRegisterEmployees() {
  const pathname = usePathname();
  const registerId = pathname.split("/")[2];
  const { data: employeesData } = useFetch<Employee[]>(
    "http://localhost:8000/employees",
  );
  const { data: registerData } = useFetch<Register>(
    "http://localhost:8000/registers/",
    registerId,
  );
  const [welder, setWelder] = useState<Employee>();
  const [cutAssistant, setCutAssistant] = useState<Employee>();
  const [foldAssistant, setFoldAssistant] = useState<Employee>();
  const [finishingAssistant, setFinishingAssistant] = useState<Employee>();
  const [paintAssistant, setPaintAssistant] = useState<Employee>();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setWelder(
      employeesData?.find(
        (employee) => employee.employee_id === registerData?.employee_uuid,
      ),
    );
    setCutAssistant(
      employeesData?.find(
        (employee) => employee.employee_id === registerData?.cut_assistant,
      ),
    );
    setFoldAssistant(
      employeesData?.find(
        (employee) => employee.employee_id === registerData?.fold_assistant,
      ),
    );
    setFinishingAssistant(
      employeesData?.find(
        (employee) =>
          employee.employee_id === registerData?.finishing_assistant,
      ),
    );
    setPaintAssistant(
      employeesData?.find(
        (employee) => employee.employee_id === registerData?.paint_assistant,
      ),
    );
  }, [employeesData, registerData]);

  return {
    welder,
    cutAssistant,
    foldAssistant,
    finishingAssistant,
    paintAssistant,
  };
}
