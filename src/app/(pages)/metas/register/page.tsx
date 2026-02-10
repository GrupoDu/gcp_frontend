import PageHeader from "@/components/ui/pageHeader";
import React from "react";
import { LuGoal } from "react-icons/lu";
import styles from "./page.module.scss";
// @ts-expect-error tipagem chata do ts
import "../../../globals.scss";
import RegisterGoalForm from "@/components/forms/registerGoalForm";
import { EmployeeProvider } from "@/providers/employee.provider";

const GoalRegisterPage = () => {
  return (
    <div className={styles.pageContainer}>
      <PageHeader headerTitle="Usuários" HeaderIcon={LuGoal} />
      <main className="mainContainer">
        <h3>Registrar nova meta</h3>
        <EmployeeProvider>
          <RegisterGoalForm />
        </EmployeeProvider>
      </main>
    </div>
  );
};

export default GoalRegisterPage;
