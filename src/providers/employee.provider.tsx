"use client";

import { EmployeeContext } from "@/context/employee.context";
import { useFetch } from "@/hooks/useFetch";
import { Employee } from "@/types/employee.type";
import { useMemo } from "react";

export function EmployeeProvider({ children }: { children: React.ReactNode }) {
  const { data, err, status, refetch } = useFetch<Employee>(
    "http://localhost:8000/employees/",
  );

  const employeesData = useMemo(
    () => ({
      employeesData: data?.employees || undefined,
      status,
      err,
      refetch,
    }),
    [data, status, err, refetch],
  );

  return (
    <EmployeeContext.Provider value={employeesData}>
      {children}
    </EmployeeContext.Provider>
  );
}
