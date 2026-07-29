"use client";

import React from "react";
import { FaChartLine } from "react-icons/fa";
import { LineChart } from "@mui/x-charts";
import Loading from "../ui/loading";
import styles from "./styles.module.scss";
import { useLoading } from "@/hooks/useLoading";
import { Breadcrumb } from "@/components/breadcrumb";
import { EmployeeAnalysisHeader } from "@/components/employeeAnalysisHeader";
import { months } from "@/Constants/months.constant";
import { useEmployeeAnalysis } from "@/hooks/useEmployeeAnalysis";
import { ProductionAnalysisChart } from "@/components/productionAnalysisChart";

/**
 * Client Component that displays detailed performance analytics for a single employee.
 * Renders employee information cards, a production trend line chart, and a product/activity bar chart.
 */
const EmployeeAnalysisDetail = () => {
  const { isLoading } = useLoading();
  const { employeeAnalysis, analysisFullYear } = useEmployeeAnalysis();

  if (isLoading || !employeeAnalysis || !analysisFullYear) {
    return (
      <div className={styles.loadingWrapper}>
        <Loading />
      </div>
    );
  }

  const lineChartSeries = [
    {
      data: analysisFullYear.map((analysis) => analysis.monthlyProduction) || [],
      label: "Produção Total (un)",
      color: "#2B79DE",
    },
  ];

  const lineChartXAxis = [
    {
      data: analysisFullYear.map((analysis) => months[analysis.month - 1]) || [],
      scaleType: "band" as const,
      tickLabelStyle: {
        fontSize: 11,
      },
    },
  ];

  return (
    <main className={`${styles.detailContainer} mainContainer`}>
      <Breadcrumb />
      <EmployeeAnalysisHeader />
      <section className={styles.chartCard}>
        <div className={styles.chartHeader}>
          <FaChartLine className={styles.chartIcon} />
          <h3>Análise de Produção Mensal</h3>
        </div>
        <div className={styles.chartWrapper}>
          <div className={styles.chartInnerWrapper}>
            <LineChart
              series={lineChartSeries}
              xAxis={lineChartXAxis}
              min={0}
              height={250}
              slotProps={{
                legend: {
                  position: { vertical: "top", horizontal: "end" },
                },
              }}
            />
          </div>
        </div>
        <div className={styles.scrollIndicator}>
          <span>← Arraste para ver todos os meses →</span>
        </div>
      </section>
      <ProductionAnalysisChart
        productActivity={employeeAnalysis.productActivity}
        activities={employeeAnalysis.activities}
        generalActivity={employeeAnalysis.generalActivity}
      />
    </main>
  );
};

export default EmployeeAnalysisDetail;
