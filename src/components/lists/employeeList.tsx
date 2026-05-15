"use client";

import styles from "./styles.module.scss";
import FiltersList from "../filtersList";
import SearchBar from "../searchBar";
import ListItem from "../userListItem";
import { useMemo, useState } from "react";
import { useEmployees } from "@/hooks/useEmployees";
import { EmployeeRoleFilter } from "../employeeRoleFilter";
import FilterMobileContainer from "../filterMobileContainer";
import { useLoading } from "@/hooks/useLoading";
import Loading from "../ui/loading";

const EmployeeListContainer = () => {
  const { employeesData, refetch } = useEmployees();
  const [employeeRoleFilter, setEmployeeRoleFilter] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [openFilterContainer, setOpenFilterContainer] = useState(false);
  const { isLoading } = useLoading();
  const filteredEmployees = useMemo(() => {
    return employeesData?.filter(
      (employee) =>
        (employeeRoleFilter ? employee.employee_role === employeeRoleFilter : true) &&
        (searchFilter ? employee.name.includes(searchFilter) : true),
    );
  }, [employeeRoleFilter, searchFilter, employeesData]);

  return (
    <>
      {isLoading && <Loading />}
      <main style={{ gap: "1rem" }} className={`mainContainer ${isLoading && "loading"}`}>
        <FiltersList
          buttonLabel="Registrar funcionário"
          hrefButton="/funcionarios/register"
          openMobileFilters={setOpenFilterContainer}
          openFilterContainer={openFilterContainer}
        >
          <SearchBar searchValue={searchFilter} setSearchValue={setSearchFilter} />
          <EmployeeRoleFilter employeeValue={employeeRoleFilter} setEmployeeValue={setEmployeeRoleFilter} />
        </FiltersList>
        <FilterMobileContainer isFilterContainerOpen={openFilterContainer}>
          <SearchBar searchValue={searchFilter} setSearchValue={setSearchFilter} />
          <EmployeeRoleFilter employeeValue={employeeRoleFilter} setEmployeeValue={setEmployeeRoleFilter} />
        </FilterMobileContainer>
        <ul className={styles.listContainer}>
          <div className={styles.listHeader}>
            <span>ID</span>
            <span>Nome</span>
            <span>Função</span>
            <span className={styles.actionsSpan}>Ações</span>
          </div>
          {filteredEmployees?.map((employee) => (
            <li key={employee.employee_uuid}>
              <ListItem
                deleteButtonEndpoint="employees"
                refetch={refetch}
                userInfos={{
                  user_uuid: employee.employee_uuid || "",
                  name: employee.name,
                  user_role: employee.employee_role,
                }}
              />
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default EmployeeListContainer;
