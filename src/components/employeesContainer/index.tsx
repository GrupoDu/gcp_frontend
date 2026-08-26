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
import ListItem from "@/components/userListItem";
import { TableList } from "@/components/lists/tableList";
import { TRACK_PARAMS } from "@/constants/trackParams.constant";

const EmployeesContainer = () => {
  const { isLoading } = useLoading();
  const searchParams = useSearchParams();
  const hasFilters = searchParams.size > 0;
  const endpoint = `employee${hasFilters ? "/filter" : ""}`;
  const { data: employees, refetch } = useFetch<Employee[]>(endpoint, TRACK_PARAMS);
  const tHeadValues = ["Nome", "Função", "Ações"];
  const isListPopulated = !!employees && employees.length > 0;
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
          <TableList tHeadValues={tHeadValues} isListPopulated={isListPopulated}>
            {displayList}
          </TableList>
        </main>
      </OpenMobileProvider>
    </>
  );
};

export default EmployeesContainer;
