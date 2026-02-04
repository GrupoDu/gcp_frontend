"use client";

import React, { useState } from "react";
import FilterDropdownBase from "../filterDropdown";

const StatusDropdown = ({
  setStatusValue,
  statusValue,
}: {
  setStatusValue: (value: string) => void;
  statusValue?: string;
}) => {
  return (
    <FilterDropdownBase
      label="status"
      placeholder="Estado do registro"
      value={statusValue}
      setValue={setStatusValue}
    >
      <option value="">Todos</option>
      <option value="Entregue">Entregue</option>
      <option value="Pendente">Pendente</option>
      <option value="Não entregue">Não entregue</option>
    </FilterDropdownBase>
  );
};

export default StatusDropdown;
