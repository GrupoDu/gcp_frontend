"use client";

import styles from "./styles.module.scss";
import FiltersList from "../filtersList";
import SearchBar from "../searchBar";
import ListItem from "../userListItem";
import { useEffect, useState } from "react";
import { useEmployees } from "@/hooks/useEmployees";
import { Employee } from "@/types/employee.type";
import { useRouter } from "next/navigation";
import { EmployeeTypeFilter } from "../employeeTypeFilter";
import FilterMobileContainer from "../filterMobileContainer";

const EmployeeListContainer = () => {
  const { employeesData, refetch } = useEmployees();
  const [employeeTypeFilter, setEmployeeTypeFilter] = useState("");
  const [employeeListFiltered, setEmployeeListFiltered] = useState<
    Employee[] | undefined
  >([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [openFilterContainer, setOpenFilterContainer] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const filterParams = new URLSearchParams();

    filterParams.set("tipo_funcionario", employeeTypeFilter);
    filterParams.set("pesquisa", searchFilter);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEmployeeListFiltered(
      employeesData?.filter(
        (employee) =>
          (employeeTypeFilter
            ? employee.employee_type === employeeTypeFilter
            : true) &&
          (searchFilter ? employee.name.includes(searchFilter) : true),
      ),
    );
  }, [router, employeeTypeFilter, searchFilter, employeesData]);

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
        {employeeListFiltered?.map((employee) => (
          <li key={employee.employee_id}>
            <ListItem
              deleteButtonEndpoint="employees"
              refetch={refetch}
              user_name={employee.name}
              user_id={employee.employee_id || ""}
              user_type={employee.employee_type}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default EmployeeListContainer;
