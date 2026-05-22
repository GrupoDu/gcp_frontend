"use client";

import React, { useState } from "react";
import FilterDropdownBase from "../filterDropdown";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { handleFilterChange } from "@/utils/handleFilterChange";

const StatusDropdown = () => {
  const pathname = usePathname();
  const [status, setStatus] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <FilterDropdownBase
      label="status"
      placeholder="Status da ordem"
      value={status}
      setValue={(e) => handleFilterChange(router, setStatus, searchParams, status, e.target.value, "status")}
    >
      <option value="">Todos</option>
      <option value={pathname.includes("producao") ? "Entregue" : "Batida"}>
        {pathname.includes("producao") ? "Entregue" : "Batida"}
      </option>
      <option value="Pendente">Pendente</option>
      <option value="Não entregue">Não entregue</option>
    </FilterDropdownBase>
  );
};

export default StatusDropdown;
