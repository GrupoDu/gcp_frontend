"use client";

import FilterDropdownBase from "../ui/filterDropdown";
import { useEmployeeRole } from "@/hooks/useEmployeeRole";

const EmployeeDropdown = ({
  setEmployeeValue,
  employeeValue,
}: {
  setEmployeeValue: (value: string) => void;
  employeeValue: string;
}) => {
  const { welders } = useEmployeeRole();

  return (
    <FilterDropdownBase value={employeeValue} setValue={setEmployeeValue} label="aaaaa" placeholder="Soldador">
      <option value="">Todos</option>
      {welders?.map((welder) => (
        <option key={welder.employee_uuid} value={welder.employee_uuid}>
          {welder.name}
        </option>
      ))}
    </FilterDropdownBase>
  );
};

export default EmployeeDropdown;
