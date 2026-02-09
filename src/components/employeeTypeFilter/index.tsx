import FilterDropdownBase from "../ui/filterDropdown";

export function EmployeeTypeFilter({
  employeeValue,
  setEmployeeValue,
}: {
  setEmployeeValue: (value: string) => void;
  employeeValue: string;
}) {
  return (
    <FilterDropdownBase
      value={employeeValue}
      setValue={setEmployeeValue}
      label="Tipo de funcionário"
      placeholder="Tipo de funcionário"
    >
      <option value="">Tipo de funcionário</option>
      <option value="assistente">Assistente</option>
      <option value="funcionario">Funcionário</option>
    </FilterDropdownBase>
  );
}
