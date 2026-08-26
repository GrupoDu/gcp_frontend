"use client";

import React from "react";
import { FaChartLine } from "react-icons/fa";
import { LineChart } from "@mui/x-charts";
import Loading from "../ui/loading";
import styles from "./styles.module.scss";
import { useLoading } from "@/hooks/useLoading";
import { Breadcrumb } from "@/components/breadcrumb";
import { EmployeeAnalysisHeader } from "@/components/employeeAnalysisHeader";
import { MONTHS } from "@/constants/months.constant";
import { useEmployeeAnalysis } from "@/hooks/useEmployeeAnalysis";
import { ProductionAnalysisChart } from "@/components/productionAnalysisChart";
import { IoWarningOutline } from "react-icons/io5";

type LineChartSeries = {
  data: number[];
  label: string;
  color: string;
};

// Bagulho horroroso da porra
type LineChartXAxis = {
  data: (
    | "Janeiro"
    | "Fevereiro"
    | "Março"
    | "Abril"
    | "Maio"
    | "Junho"
    | "Julho"
    | "Agosto"
    | "Setembro"
    | "Outubro"
    | "Novembro"
    | "Dezembro"
  )[];
  readonly scaleType: "band";
  tickLabelStyle: {
    fontSize: number;
  };
};

type LineChartProps = {
  lineChartSeries: LineChartSeries[];
  lineChartXAxis: LineChartXAxis[];
  analysisNotFound: boolean;
};

/**
 * Client Component that displays detailed performance analytics for a single employee.
 * Renders employee information cards, a production trend line chart, and a product/activity bar chart.
 */
const EmployeeAnalysisDetail = () => {
  const { isLoading } = useLoading();
  const { employeeAnalysis, analysisFullYear } = useEmployeeAnalysis();
  const analysisNotFound = employeeAnalysis.monthlyTotalProduction === 0;

  if (isLoading || !employeeAnalysis || !analysisFullYear) {
    return (
      <div className={styles.loadingWrapper}>
        <Loading />
      </div>
    );
  }

  const lineChartSeries: LineChartSeries[] = [
    {
      data: analysisFullYear.map((analysis) => analysis.monthlyProduction) || [],
      label: "Produção Total (un)",
      color: "#2B79DE",
    },
  ];

  const lineChartXAxis: LineChartXAxis[] = [
    {
      data: analysisFullYear.map((analysis) => MONTHS[analysis.month - 1]) || [],
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
            <DisplayLineChart
              lineChartXAxis={lineChartXAxis}
              lineChartSeries={lineChartSeries}
              analysisNotFound={analysisNotFound}
            />
          </div>
        </div>
        <div className={styles.scrollIndicator}>
          <span>← Arraste para ver todos os meses →</span>
        </div>
      </section>
      <ProductionAnalysisChart />
    </main>
  );
};

function DisplayLineChart({ lineChartSeries, lineChartXAxis, analysisNotFound }: LineChartProps) {
  if (analysisNotFound) {
    return (
      <>
        <div className={styles.dataNotFound}>
          <IoWarningOutline className={styles.warningIcon} />
          <h3>Nenhum dado encontrado</h3>
        </div>
        <span className={styles.warning}>Verifique se o funcionário tem dados de produção do mês atual</span>
      </>
    );
  }

  return (
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
  );
}

export default EmployeeAnalysisDetail;
