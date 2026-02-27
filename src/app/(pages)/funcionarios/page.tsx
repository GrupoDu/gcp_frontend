import React from "react";
import styles from "./page.module.scss";
// @ts-expect-error tipagem chata do ts
import "../../globals.scss";
import { EmployeeProvider } from "@/providers/employee.provider";
import EmployeeListContainer from "@/components/lists/employeeList";
import PageHeader from "@/components/ui/pageHeader";
import { GrUserWorker } from "react-icons/gr";

const EmployeePage = () => {
  return (
    <div className="pageContainer">
      <PageHeader headerTitle="Funcionários" HeaderIcon={GrUserWorker} />
      <EmployeeProvider>
        <EmployeeListContainer />
      </EmployeeProvider>
    </div>
  );
};

export default EmployeePage;
