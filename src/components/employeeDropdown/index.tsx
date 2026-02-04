"use client";

import React, { useState } from "react";
import styles from "./styles.module.scss";
import FilterDropdownBase from "../ui/filterDropdown";
import { useEmployees } from "@/hooks/useEmployees";

const EmployeeDropdown = ({
  setEmployeeValue,
  employeeValue,
}: {
  setEmployeeValue: (value: string) => void;
  employeeValue: string;
}) => {
  const { employeesData, status, err } = useEmployees();

  return (
    <FilterDropdownBase
      value={employeeValue}
      setValue={setEmployeeValue}
      label="aaaaa"
      placeholder="Funcionário responsável"
    >
      <option value="">Todos</option>
      {employeesData?.map((employee) => (
        <option key={employee.employee_id} value={employee.employee_id}>
          {employee.name}
        </option>
      ))}
    </FilterDropdownBase>
  );
};

export default EmployeeDropdown;
