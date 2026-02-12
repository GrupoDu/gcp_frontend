import React from "react";
import styles from "./page.module.scss";
import PageHeader from "@/components/ui/pageHeader";
import { LuGoal } from "react-icons/lu";
import { EmployeeProvider } from "@/providers/employee.provider";
import GoalForm from "@/components/forms/goalForm";
import { GoalProvider } from "@/providers/goal.provider";

const GoalEditPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  return (
    <div className={styles.pageContainer}>
      <PageHeader headerTitle="Metas" HeaderIcon={LuGoal} />
      <main className="mainContainer">
        <h3>Editar meta</h3>
        <GoalProvider>
          <EmployeeProvider>
            <GoalForm isEdit={true} goal_id={slug} />
          </EmployeeProvider>
        </GoalProvider>
      </main>
    </div>
  );
};

export default GoalEditPage;
