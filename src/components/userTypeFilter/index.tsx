"use client";

import FilterDropdownBase from "../ui/filterDropdown";

const UserTypeFilter = ({
  setUserFilter,
  userFilter,
}: {
  setUserFilter: (value: string) => void;
  userFilter: string;
}) => {
  return (
    <FilterDropdownBase
      value={userFilter}
      setValue={setUserFilter}
      label="Tipo de usuário"
      placeholder="Tipo de usuário"
    >
      <option value="">Todos</option>
      <option value="admin">Admin</option>
      <option value="supervisor">Supervisor</option>
    </FilterDropdownBase>
  );
};

export default UserTypeFilter;
