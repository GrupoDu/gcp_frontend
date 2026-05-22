import React from "react";
import styles from "./page.module.scss";
import PageHeader from "@/components/ui/pageHeader";
import { FaUserCog } from "react-icons/fa";
import EmployeeForm from "@/components/forms/employeeForm";

const EmployeeRegisterPage = () => {
  return (
    <div className={styles.pageContainer}>
      <PageHeader headerTitle="Usuários" HeaderIcon={FaUserCog} />
      <main className="mainContainer">
        <h3>Registrar novo usuário</h3>
        <EmployeeForm isEdit={false} />
      </main>
    </div>
  );
};

export default EmployeeRegisterPage;
