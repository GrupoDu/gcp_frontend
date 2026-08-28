import SelectInput from "../ui/selectInput";
import styles from "./styles.module.scss";
import { useState } from "react";
import { setQueryParams } from "@/utils/setQueryParams";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SelectOption } from "@/types/selectOption.interface";
import { useFetch } from "@/hooks/useFetch";
import { Employee } from "@/types/employee.interface";

type EmployeeInputSelectProps = {
  targetFilter: "welderUuid" | "assistantUuid";
  employeeRole: "Soldador" | "Assistente";
};

export const EmployeeInputSelect = ({ targetFilter, employeeRole }: EmployeeInputSelectProps) => {
  const [employeeFilter, setEmployeeFilter] = useState("");
  const router = useRouter();
  const { data: employees } = useFetch<Employee[]>(`employee/filter?role=${employeeRole}`);
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleEmployeeChange = (value: string) => {
    setEmployeeFilter(value);
    const params = setQueryParams({ searchParams, key: targetFilter, value });
    router.push(`${pathname}?${params}`);
  };

  return (
    <SelectInput
      onChange={(e) => handleEmployeeChange(e.target.value)}
      value={employeeFilter}
      label={employeeRole}
      options={extractEmployeeOptions(employees)}
      defaultValue={"Selecione um soldador"}
    />
  );
};

function extractEmployeeOptions(employees: Employee[] | undefined) {
  if (!employees) return [];

  return employees.map((employee) => ({
    value: employee.employeeUuid,
    label: employee.name,
  }));
}
