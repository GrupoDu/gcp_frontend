"use client";

import React, { useRef, useState } from "react";
import FilterDropdownBase from "../filterDropdown";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { handleFilterChange } from "@/utils/handleFilterChange";

const StatusDropdown = () => {
  const pathname = usePathname();
  const [status, setStatus] = useState("");
  const statusFilterParam = useRef("");
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <FilterDropdownBase
      label="status"
      placeholder="Status da ordem"
      value={status}
      setValue={(e) => handleFilterChange(router, setStatus, searchParams, statusFilterParam, e.target.value, "status")}
    >
      <option value="">Todos</option>
      <option value={pathname.includes("producao") ? "Finalizado" : "Batida"}>
        {pathname.includes("producao") ? "Finalizado" : "Batida"}
      </option>
      <option value="EmProducao">Em Produção</option>
      <option value="Atrasado">Atrasado</option>
    </FilterDropdownBase>
  );
};

export default StatusDropdown;
