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

const AnalysticsContainer = () => {
  return (
    <div className={styles.analyticsContainer}>
      <div className={styles.lineChart}>
        <AnualAnalysisProvider>
          <LineChartContainer />
        </AnualAnalysisProvider>
      </div>
      <div className={styles.pieChart}>
        <ProductionOrderAnalysisProvider>
          <PieChartContainer />
        </ProductionOrderAnalysisProvider>
        <div className={styles.pieChartGoal} />
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
    </div>
  );
};

export default AnalysticsContainer;
