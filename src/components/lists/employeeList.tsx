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
import { Employee } from "@/types/employee.interface";
import { useSearchParams } from "next/navigation";

const EmployeeListContainer = () => {
  const { isLoading } = useLoading();
  const { data: employees, refetch } = useFetch<Employee[]>("employee");
  const searchParams = useSearchParams();
  const searchFilter = searchParams.get("name");
  const employeeRoleFilter = searchParams.get("employee");
  const filteredEmployees = employees?.filter(
    (employee) =>
      (employeeRoleFilter ? employee.employeeRole === employeeRoleFilter : true) &&
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
        <div style={{ borderRadius: ".4rem" }} className="tableWrapper">
          <table className={"listContainer"}>
            <thead className={"listHeader"}>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Função</th>
                <th className={styles.actionsSpan}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees?.map((employee) => (
                <ListItem
                  key={employee.employeeUuid}
                  deleteButtonEndpoint="employees"
                  refetch={refetch}
                  userInfos={{
                    userUuid: employee.employeeUuid || "",
                    name: employee.name,
                    userRole: employee.employeeRole,
                  }}
                />
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default EmployeeListContainer;
