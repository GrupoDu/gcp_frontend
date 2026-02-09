import React from "react";
import styles from "./page.module.scss";
// @ts-expect-error tipagem chata do ts
import "../../globals.scss";
import { EmployeeProvider } from "@/providers/employee.provider";
import EmployeeListContainer from "@/components/lists/employeeList";

const EmployeePage = () => {
  return (
    <div className={styles.pageContainer}>
      <main className="mainContainer">
        <h2>Lista de Funcionários</h2>
        <EmployeeProvider>
          <EmployeeListContainer />
        </EmployeeProvider>
      </main>
    </div>
  );
};

export default EmployeePage;
