"use client";

import FilterDropdownBase from "../ui/filterDropdown";
import { useRef, useState } from "react";
import { Employee } from "@/types/employee.type";
import { useFetch } from "@/hooks/useFetch";
import { useRouter, useSearchParams } from "next/navigation";
import { handleFilterChange } from "@/utils/handleFilterChange";

const EmployeeDropdown = () => {
  const { data: welders } = useFetch<Employee[]>("/employees");
  const [welderFilter, setWelderFilter] = useState("");
  const welderFilterParam = useRef("");
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <FilterDropdownBase
      value={welderFilter}
      setValue={(e) =>
        handleFilterChange(router, setWelderFilter, searchParams, welderFilterParam, e.target.value, "employee")
      }
      label="Soldador"
      placeholder="Soldador"
    >
      <option value="">Todos</option>
      {welders?.map((welder) => (
        <option key={welder.employee_uuid} value={welder.employee_uuid}>
          {welder.name}
        </option>
      ))}
    </FilterDropdownBase>
  );
};

export default EmployeeDropdown;
