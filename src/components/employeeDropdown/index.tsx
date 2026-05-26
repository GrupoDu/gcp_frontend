"use client";

import FilterDropdownBase from "../ui/filterDropdown";
import { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { handleFilterChange } from "@/utils/handleFilterChange";

const EmployeeDropdown = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [employeeFilter, setEmployeeFilter] = useState("");
  const employeeFiterParam = useRef("");
  const employeeRoles = [
    { value: "", label: "Todos" },
    { value: "soldador", label: "Soldador" },
    { value: "assistente", label: "Assistente" },
  ];

  return (
    <FilterDropdownBase
      value={employeeFilter}
      setValue={(e) =>
        handleFilterChange(router, setEmployeeFilter, searchParams, employeeFiterParam, e.target.value, "employee")
      }
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
