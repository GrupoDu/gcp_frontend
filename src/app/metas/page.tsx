import React from "react";
import styles from "./page.module.scss";
import PageHeader from "@/components/ui/pageHeader";
import "../globals.scss";
import { LuGoal } from "react-icons/lu";
import GoalListContainer from "@/components/goalListContainer";
import { GoalProvider } from "@/providers/goal.provider";

const GoalPage = () => {
  return (
    <div className={styles.pageContainer}>
      <PageHeader headerTitle="Metas" HeaderIcon={LuGoal} />
      <main className="mainContainer">
        <h2>Lista da Metas</h2>
        <GoalProvider>
          <GoalListContainer />
        </GoalProvider>
      </main>
    </div>
  );
};

export default GoalPage;
