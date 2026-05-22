"use client";

import styles from "./styles.module.scss";
import FiltersList from "../filtersList";
import SearchBar from "../searchBar";
import ListItem from "../userListItem";
import { EmployeeRoleFilter } from "../employeeRoleFilter";
import FilterMobileContainer from "../filterMobileContainer";
import { useLoading } from "@/hooks/useLoading";
import Loading from "../ui/loading";
import { useFetch } from "@/hooks/useFetch";
import { Employee } from "@/types/employee.type";
import { useSearchParams } from "next/navigation";

const EmployeeListContainer = () => {
  const { isLoading } = useLoading();
  const { data: employees, refetch } = useFetch<Employee[]>("employees");
  const searchParams = useSearchParams();
  const searchFilter = searchParams.get("name");
  const employeeRoleFilter = searchParams.get("employee");
  const filteredEmployees = employees?.filter(
    (employee) =>
      (employeeRoleFilter ? employee.employee_role === employeeRoleFilter : true) &&
      (searchFilter ? employee.name.includes(searchFilter) : true),
  );

  return (
    <>
      {isLoading && <Loading />}
      <main style={{ gap: "1rem" }} className={`mainContainer ${isLoading && "loading"}`}>
        <FiltersList buttonLabel="Registrar funcionário" hrefButton="/funcionarios/register">
          <SearchBar targetFilter={"name"} />
          <EmployeeRoleFilter />
        </FiltersList>
        <FilterMobileContainer>
          <SearchBar targetFilter={"name"} />
          <EmployeeRoleFilter />
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
