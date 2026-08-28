"use client";

import FilterDropdownBase from "../ui/filterDropdown";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getSearchParams } from "@/utils/getSearchParams";

function setUserQueryParams(searchParams: URLSearchParams, targetFilter: string, value: string) {
  const params = getSearchParams(searchParams);

  params.set(targetFilter, value);

  if (value === "") params.delete(targetFilter);

  return params.toString();
}

const UserRoleFilter = () => {
  const [userFilter, setUserFilter] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = setUserQueryParams(searchParams, "userRole", e.target.value || "");
    setUserFilter(e.target.value);
    router.push(`${pathname}?${params}`);
  };

  return (
    <FilterDropdownBase
      value={userFilter}
      setValue={(e) => handleFilterChange(e)}
      label="Tipo de usuário"
      placeholder="Tipo de usuário"
    >
      <option value="">Todos</option>
      <option value="Admin">Admin</option>
      <option value="Supervisor">Supervisor</option>
    </FilterDropdownBase>
  );
};

export default UserRoleFilter;
