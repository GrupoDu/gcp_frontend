"use client";

import React, { useState } from "react";
import FilterDropdownBase from "../filterDropdown";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { setQueryParams } from "@/utils/setQueryParams";

const StatusDropdown = () => {
  const pathname = usePathname();
  const [status, setStatus] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleStatusChange = (value: string) => {
    setStatus(value);
    const params = setQueryParams({
      searchParams,
      key: "status",
      value,
    });
    router.push(`${pathname}?${params}`);
  };

  return (
    <FilterDropdownBase
      label="status"
      placeholder="Status da ordem"
      value={status}
      setValue={(e) => handleStatusChange(e.target.value)}
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
