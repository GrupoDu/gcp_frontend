"use client";

import FilterDropdownBase from "../ui/filterDropdown";
import { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { handleFilterChange } from "@/utils/handleFilterChange";

const UserRoleFilter = () => {
  const [userFilter, setUserFilter] = useState("");
  const userFilterParam = useRef("");
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <FilterDropdownBase
      value={userFilter}
      setValue={(e) =>
        handleFilterChange(router, setUserFilter, searchParams, userFilterParam, e.target.value, "userRole")
      }
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
