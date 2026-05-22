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
        handleFilterChange(router, setUserFilter, searchParams, userFilterParam, e.target.value, "user_type")
      }
      label="Tipo de usuário"
      placeholder="Tipo de usuário"
    >
      <option value="">Todos</option>
      <option value="admin">Admin</option>
      <option value="supervisor">Supervisor</option>
    </FilterDropdownBase>
  );
};

export default UserRoleFilter;
