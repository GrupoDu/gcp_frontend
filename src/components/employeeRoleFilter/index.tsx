"use client";

import FilterDropdownBase from "../ui/filterDropdown";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { setQueryParams } from "@/utils/setQueryParams";

export function EmployeeRoleFilter() {
  const [employeeRoleFilter, setEmployeeRoleFilter] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleFilterChange = (value: string) => {
    setEmployeeRoleFilter(value);
    const params = setQueryParams({
      searchParams,
      value,
      key: "role",
    });
    router.push(`${pathname}?${params}`);
  };

  return (
    <FilterDropdownBase
      value={employeeRoleFilter}
      setValue={(e) => handleFilterChange(e.target.value)}
      label="Tipo de funcionário"
      placeholder="Tipo de funcionário"
    >
      <option value="">Todos</option>
      <option value="Assistente">Assistente</option>
      <option value="Soldador">Soldador</option>
    </FilterDropdownBase>
  );
}
