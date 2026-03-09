"use client";

import FilterDropdownBase from "../ui/filterDropdown";
import { useEmployeeType } from "@/hooks/useEmployeeType";

const EmployeeDropdown = ({
  setEmployeeValue,
  employeeValue,
}: {
  setEmployeeValue: (value: string) => void;
  employeeValue: string;
}) => {
  const { welders } = useEmployeeType();

  return (
    <FilterDropdownBase value={employeeValue} setValue={setEmployeeValue} label="aaaaa" placeholder="Soldador">
      <option value="">Todos</option>
      {welders?.map((welder) => (
        <option key={welder.employee_id} value={welder.employee_id}>
          {welder.name}
        </option>
      ))}
    </FilterDropdownBase>
  );
};

export default EmployeeDropdown;
