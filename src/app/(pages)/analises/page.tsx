"use client";

import { FaGears } from "react-icons/fa6";
import PageHeader from "@/components/ui/pageHeader";
import AnalyticsContainer from "@/components/analyticsContainer";
import styles from "./page.module.scss";
import { useLoading } from "@/hooks/useLoading";
import Loading from "@/components/ui/loading";
import GoalSection from "@/components/goalSection";
import PieChartContainer from "@/components/pieChartContainer";
import LineChartContainer from "@/components/lineChartContainer";
import EmployeeAnalysisContainer from "@/components/employeeAnalysisContainer";

const AnalysisPage = () => {
  const { isLoading } = useLoading();

  return (
    <div className="pageContainer">
      <PageHeader headerTitle="Análises" HeaderIcon={FaGears} />
      {isLoading && <Loading />}
      <main className={`${styles.analyticsContainer} mainContainer ${isLoading && "loading"} `}>
        <div className={styles.lineChart}>
          <LineChartContainer />
        </div>
        <div className={styles.goalsAndPieAnalysis}>
          <PieChartContainer />
          <GoalSection />
        </div>
        <div className={styles.employeesAnalysis}>
          <EmployeeAnalysisContainer employeeRole={"Soldador"} />
          <EmployeeAnalysisContainer employeeRole={"Assistente"} />
        </div>
      </main>
    </div>
  );
};

export default AnalysisPage;
