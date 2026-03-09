"use client";

import React from "react";
import styles from "./styles.module.scss";
import LineChartContainer from "../lineChartContainer";
import { AnualAnalysisProvider } from "@/providers/anualAnalysis.provider";
import PieChartContainer from "../pieChartContainer";
import { ProductionOrderAnalysisProvider } from "@/providers/productionOrderAnalysis.provider";
import GoalSection from "../goalSection";
import { GoalProvider } from "@/providers/goal.provider";
import { EmployeeProvider } from "@/providers/employee.provider";
import EmployeeAnalysisContainer from "../employeeAnalysisContainer";
import { GoalsAnalysisProvider } from "@/providers/goalsAnalysis.provider";
import { GoalsPieChart } from "../goalsPieChart";
import { useLoading } from "@/hooks/useLoading";
import Loading from "../ui/loading";

const AnalysticsContainer = () => {
  const { isLoading } = useLoading();

  return (
    <>
      {isLoading && <Loading />}
      <main className={`${styles.analyticsContainer} mainContainer ${isLoading && "loading"} `}>
        <div className={styles.lineChart}>
          <AnualAnalysisProvider>
            <LineChartContainer />
          </AnualAnalysisProvider>
        </div>
        <div className={styles.pieChart}>
          <ProductionOrderAnalysisProvider>
            <PieChartContainer />
          </ProductionOrderAnalysisProvider>
          <GoalsAnalysisProvider>
            <GoalsPieChart />
          </GoalsAnalysisProvider>
        </div>
        <div className={styles.pendingGoal}>
          <GoalProvider>
            <GoalSection />
          </GoalProvider>
        </div>
        <div className={styles.employeesAnalysis}>
          <EmployeeProvider>
            <EmployeeAnalysisContainer />
          </EmployeeProvider>
        </div>
      </main>
    </>
  );
};

export default AnalysticsContainer;
