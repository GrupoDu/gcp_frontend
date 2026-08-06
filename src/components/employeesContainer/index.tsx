"use client";

import React from "react";
import OpenMobileProvider from "@/providers/openMobile.provider";
import Loading from "@/components/ui/loading";
import { useLoading } from "@/hooks/useLoading";
import { useFetch } from "@/hooks/useFetch";
import { useSearchParams } from "next/navigation";
import { Employee } from "@/types/employee.interface";
import FiltersList from "@/components/filtersList";
import SearchBar from "@/components/searchBar";
import { EmployeeRoleFilter } from "@/components/employeeRoleFilter";
import FilterMobileContainer from "@/components/filterMobileContainer";
import ListItem from "@/components/userListItem";
import { TableList } from "@/components/lists/tableList";

const EmployeesContainer = () => {
  const { isLoading } = useLoading();
  const { data: employees, refetch } = useFetch<Employee[]>("employee");
  const searchParams = useSearchParams();
  const searchFilter = searchParams.get("name");
  const employeeRoleFilter = searchParams.get("employee");
  const tHeadValues = ["ID", "Nome", "Função", "Ações"];
  const filteredEmployees = employees?.filter(
    (employee) =>
      (employeeRoleFilter ? employee.employeeRole === employeeRoleFilter : true) &&
      (searchFilter ? employee.name.includes(searchFilter) : true),
  );
  const isListPopulated = !!filteredEmployees && filteredEmployees.length > 0;
  const displayList = employees?.map((employee) => (
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
  ));

  return (
    <>
      {isLoading && <Loading />}
      <OpenMobileProvider>
        <main style={{ gap: "1rem" }} className={`mainContainer ${isLoading && "loading"}`}>
          <FiltersList buttonLabel="Registrar funcionário" hrefButton="/funcionarios/register">
            <SearchBar targetFilter={"name"} />
            <EmployeeRoleFilter />
          </FiltersList>
          <FilterMobileContainer>
            <SearchBar targetFilter={"name"} />
            <EmployeeRoleFilter />
          </FilterMobileContainer>
          <TableList tHeadValues={tHeadValues} isListPopulated={isListPopulated}>
            {displayList}
          </TableList>
        </main>
      </OpenMobileProvider>
    </>
  );
};

export default EmployeesContainer;
