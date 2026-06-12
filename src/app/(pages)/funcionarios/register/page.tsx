import React from "react";
import styles from "./page.module.scss";
import PageHeader from "@/components/ui/pageHeader";
import { FaUserCog } from "react-icons/fa";
import EmployeeForm from "@/components/forms/employeeForm";
import { Breadcrumb } from "@/components/breadcrumb";

const EmployeeRegisterPage = () => {
  return (
    <div className={styles.pageContainer}>
      <PageHeader headerTitle="Funcionários" HeaderIcon={FaUserCog} />
      <main className="mainContainer">
        <Breadcrumb />
        <h3>Registrar novo usuário</h3>
        <EmployeeForm isEdit={false} />
      </main>
    </div>
  );
};

export default EmployeeRegisterPage;
