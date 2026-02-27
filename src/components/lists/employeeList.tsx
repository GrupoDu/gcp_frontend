"use client";

import styles from "./styles.module.scss";
import FiltersList from "../filtersList";
import SearchBar from "../searchBar";
import ListItem from "../userListItem";
import { useMemo, useState } from "react";
import { useEmployees } from "@/hooks/useEmployees";
import { useRouter } from "next/navigation";
import { EmployeeTypeFilter } from "../employeeTypeFilter";
import FilterMobileContainer from "../filterMobileContainer";

const EmployeeListContainer = () => {
  const { employeesData, refetch } = useEmployees();
  const [employeeTypeFilter, setEmployeeTypeFilter] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [openFilterContainer, setOpenFilterContainer] = useState(false);
  const filteredEmployees = useMemo(() => {
    return employeesData?.filter(
      (employee) =>
        (employeeTypeFilter
          ? employee.employee_type === employeeTypeFilter
          : true) &&
        (searchFilter ? employee.name.includes(searchFilter) : true),
    );
  }, [employeeTypeFilter, searchFilter, employeesData]);

  return (
    <>
      <div>
        <FiltersList
          buttonLabel="Registrar funcionário"
          hrefButton="/funcionarios/register"
          openMobileFilters={setOpenFilterContainer}
          openFilterContainer={openFilterContainer}
        >
          <SearchBar
            searchValue={searchFilter}
            setSearchValue={setSearchFilter}
          />
          <EmployeeTypeFilter
            employeeValue={employeeTypeFilter}
            setEmployeeValue={setEmployeeTypeFilter}
          />
        </FiltersList>
      </div>
      <FilterMobileContainer isFilterContainerOpen={openFilterContainer}>
        <SearchBar
          searchValue={searchFilter}
          setSearchValue={setSearchFilter}
        />
        <EmployeeTypeFilter
          employeeValue={employeeTypeFilter}
          setEmployeeValue={setEmployeeTypeFilter}
        />
      </FilterMobileContainer>
      <ul className={styles.listContainer}>
        <div className={styles.listHeader}>
          <span>ID</span>
          <span>Nome</span>
          <span>Função</span>
          <span className={styles.actionsSpan}>Ações</span>
        </div>
        {filteredEmployees?.map((employee) => (
          <li key={employee.employee_id}>
            <ListItem
              deleteButtonEndpoint="employees"
              refetch={refetch}
              userInfos={{
                user_id: employee.employee_id || "",
                name: employee.name,
                user_type: employee.employee_type,
              }}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default EmployeeListContainer;
