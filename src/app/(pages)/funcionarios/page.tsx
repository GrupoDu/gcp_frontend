"use client";

import EmployeesContainer from "@/components/employeesContainer";
import { Suspense } from "react";
import React from "react";
import PageHeader from "@/components/ui/pageHeader";
import { GrUserWorker } from "react-icons/gr";
import FiltersList from "@/components/filtersList";
import SearchBar from "@/components/searchBar";
import { EmployeeRoleFilter } from "@/components/employeeRoleFilter";
import { useLoading } from "@/hooks/useLoading";
import OpenMobileProvider from "@/providers/openMobile.provider";
import Loading from "@/components/ui/loading";

const EmployeePage = () => {
  const { isLoading } = useLoading();

  return (
    <div className="pageContainer">
      <PageHeader headerTitle="Funcionários" HeaderIcon={GrUserWorker} />
      {isLoading && <Loading />}
      <main style={{ gap: "1rem" }} className={`mainContainer ${isLoading && "loading"}`}>
        <OpenMobileProvider>
          <Suspense>
            <FiltersList buttonLabel="Registrar funcionário" hrefButton="/funcionarios/register">
              <SearchBar targetFilter={"name"} />
              <EmployeeRoleFilter />
            </FiltersList>
          </Suspense>
        </OpenMobileProvider>
        <Suspense>
          <EmployeesContainer />
        </Suspense>
      </main>
    </div>
  );
};

export default EmployeePage;
