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
import AssistantsPORegisterProvider from "@/providers/assistantsPORegister.provider";

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
        <div className={styles.goalsAndPieAnalysis}>
          <ProductionOrderAnalysisProvider>
            <PieChartContainer />
          </ProductionOrderAnalysisProvider>
          <GoalProvider>
            <GoalSection />
          </GoalProvider>
        </div>
        <div className={styles.employeesAnalysis}>
          <EmployeeProvider>
            <EmployeeAnalysisContainer employeeType={"soldadores"} />
            <EmployeeAnalysisContainer employeeType={"assistentes"} />
          </EmployeeProvider>
        </div>
      </main>
    </>
  );
};

export default AnalysticsContainer;
