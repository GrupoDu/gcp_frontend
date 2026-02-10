import React from "react";
import styles from "./page.module.scss";
import PageHeader from "@/components/ui/pageHeader";
import { FaUserCog } from "react-icons/fa";
import RegisterEmployeeForm from "@/components/forms/registerEmployeeForm";

const EmployeeRegisterPage = () => {
  return (
    <div className={styles.pageContainer}>
      <PageHeader headerTitle="Usuários" HeaderIcon={FaUserCog} />
      <main className="mainContainer">
        <h3>Registrar novo usuário</h3>
        <RegisterEmployeeForm />
      </main>
    </div>
  );
};

export default EmployeeRegisterPage;
