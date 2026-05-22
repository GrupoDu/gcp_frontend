"use client";

import FilterDropdownBase from "../ui/filterDropdown";
import { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { handleFilterChange } from "@/utils/handleFilterChange";

export function EmployeeRoleFilter() {
  const [employeeRoleFilter, setEmployeeRoleFilter] = useState("");
  const employeeParam = useRef("");
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <FilterDropdownBase
      value={employeeRoleFilter}
      setValue={(e) =>
        handleFilterChange(router, setEmployeeRoleFilter, searchParams, employeeParam, e.target.value, "employee")
      }
      label="Tipo de funcionário"
      placeholder="Tipo de funcionário"
    >
      <option value="">Todos</option>
      <option value="assistente">Assistente</option>
      <option value="soldador">Soldador</option>
    </FilterDropdownBase>
  );
}
