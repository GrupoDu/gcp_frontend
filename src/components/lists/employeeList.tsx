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
                  key={employee.employee_uuid}
                  deleteButtonEndpoint="employees"
                  refetch={refetch}
                  userInfos={{
                    user_uuid: employee.employee_uuid || "",
                    name: employee.name,
                    user_role: employee.employee_role,
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
