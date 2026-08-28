"use client";

import React from "react";
import { useFetch } from "@/hooks/useFetch";
import { useSearchParams } from "next/navigation";
import { Employee } from "@/types/employee.interface";
import ListItem from "@/components/userListItem";
import { TableList } from "@/components/lists/tableList";
import { EMPLOYEE_TABLE_HEADS } from "@/constants/tableHeads";

const EmployeesContainer = () => {
  const searchParams = useSearchParams();
  const hasFilters = searchParams.size > 0;
  const endpoint = `employee${hasFilters ? `/filter?${searchParams.toString()}` : ""}`;
  const { data: employees, refetch } = useFetch<Employee[]>(endpoint);
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
    <TableList tHeadValues={EMPLOYEE_TABLE_HEADS} isListPopulated={isListPopulated}>
      {displayList}
    </TableList>
  );
};

export default EmployeesContainer;
