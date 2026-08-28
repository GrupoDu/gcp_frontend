"use client";

import FilterDropdownBase from "../ui/filterDropdown";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { setQueryParams } from "@/utils/setQueryParams";

const EmployeeDropdown = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [employeeFilter, setEmployeeFilter] = useState("");
  const employeeRoles = [
    { value: "", label: "Todos" },
    { value: "Soldador", label: "Soldador" },
    { value: "Assistente", label: "Assistente" },
  ];

  const handleEmployeeChange = (value: string) => {
    setEmployeeFilter(value);
    const params = setQueryParams({
      searchParams,
      key: "employee",
      value,
    });
    router.push(`${pathname}?${params}`);
  };

  return (
    <FilterDropdownBase
      value={employeeFilter}
      setValue={(e) => handleEmployeeChange(e.target.value)}
      label={"Cargo"}
      placeholder={"Cargo"}
    >
      {employeeRoles.map((employee, index) => (
        <option key={index} value={employee.value}>
          {employee.label}
        </option>
      ))}
    </FilterDropdownBase>
  );
};

export default EmployeeDropdown;
