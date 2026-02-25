"use client";

import React, { useState } from "react";
import FilterDropdownBase from "../filterDropdown";
import { usePathname } from "next/navigation";

const StatusDropdown = ({
  setStatusValue,
  statusValue,
}: {
  setStatusValue: (value: string) => void;
  statusValue?: string;
}) => {
  const pathname = usePathname();

  return (
    <FilterDropdownBase
      label="status"
      placeholder="Status da ordem"
      value={statusValue}
      setValue={setStatusValue}
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
