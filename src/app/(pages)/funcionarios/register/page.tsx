import React from "react";
import styles from "./page.module.scss";
import PageHeader from "@/components/ui/pageHeader";
import { FaUserCog } from "react-icons/fa";
import EmployeeForm from "@/components/forms/employeeForm";
import { EmployeeProvider } from "@/providers/employee.provider";

const EmployeeRegisterPage = () => {
  return (
    <div className={styles.pageContainer}>
      <PageHeader headerTitle="Usuários" HeaderIcon={FaUserCog} />
      <main className="mainContainer">
        <h3>Registrar novo usuário</h3>
        <EmployeeProvider>
          <EmployeeForm isEdit={false} />
        </EmployeeProvider>
      </main>
    </div>
  );
};

export default EmployeeRegisterPage;
