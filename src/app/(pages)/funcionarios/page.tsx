import React from "react";
import styles from "./page.module.scss";
import "../../globals.scss";
import { EmployeeProvider } from "@/providers/employee.provider";
import EmployeeListContainer from "@/components/lists/employeeList";
import PageHeader from "@/components/ui/pageHeader";
import { GrUserWorker } from "react-icons/gr";
import OpenMobileProvider from "@/providers/openMobile.provider";

const EmployeePage = () => {
  return (
    <div className="pageContainer">
      <PageHeader headerTitle="Funcionários" HeaderIcon={GrUserWorker} />
      <OpenMobileProvider>
        <EmployeeListContainer />
      </OpenMobileProvider>
    </div>
  );
};

export default EmployeePage;
