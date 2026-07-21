"use client";

import React from "react";
import { FaIdCard, FaArrowUp, FaArrowDown, FaChartLine } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";
import { LineChart, BarChart } from "@mui/x-charts";
import Loading from "../ui/loading";
import styles from "./styles.module.scss";
import { useFetch } from "@/hooks/useFetch";
import { EmployeeAnalysis } from "@/types/employeeAnalysis.interface";
import { useLoading } from "@/hooks/useLoading";
import { Breadcrumb } from "@/components/breadcrumb";
import { CiCalendar } from "react-icons/ci";

interface EmployeeAnalysisDetailProps {
  employeeUuid: string;
}

/**
 * Client Component that displays detailed performance analytics for a single employee.
 * Renders employee information cards, a production trend line chart, and a product/activity bar chart.
 *
 * @param {EmployeeAnalysisDetailProps} props Component props.
 */
const EmployeeAnalysisDetail = ({ employeeUuid }: EmployeeAnalysisDetailProps) => {
  const { isLoading } = useLoading();
  const { data: employeeAnalysis } = useFetch<EmployeeAnalysis>(`employeeAnalysis/${employeeUuid}`);
  const { data: employeeAnalysisFullYear } = useFetch<EmployeeAnalysis[]>(`employeeAnalysis/fullYear/${employeeUuid}`);

  console.log(employeeAnalysis);

  if (isLoading || !employeeAnalysis || !employeeAnalysisFullYear) {
    return (
      <div className={styles.loadingWrapper}>
        <Loading />
      </div>
    );
  }

  const isWelder = employeeAnalysis.employees.employeeRole === "soldador";
  const isAssistant = employeeAnalysis.employees.employeeRole === "assistente";
  const actualMonth = new Date().getMonth();
  const lastProductionCount = employeeAnalysisFullYear.find((analysis) => analysis.month === actualMonth - 1);

  enum monthNames {
    "Janeiro" = 1,
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  }

  const lineChartSeries = [
    {
      data: employeeAnalysisFullYear.map((analysis) => analysis.monthlyTotalProduction) || [],
      label: "Produção Total (un)",
      color: "#2B79DE",
    },
  ];

  const lineChartXAxis = [
    {
      data: employeeAnalysisFullYear.map((analysis) => monthNames[analysis.month]) || [],
      scaleType: "band" as const,
      tickLabelStyle: {
        fontSize: 11,
      },
    },
  ];

  const getProducts = isWelder && employeeAnalysis.fullProductsAnalysis;
  const getActivities = isAssistant && employeeAnalysis.fullActivityAnalysis;
  const barChartDataName = () => {
    if (getProducts) return getProducts?.map((product) => product.product?.name || "Solda Geral");
    if (getActivities) return getActivities.map((activity) => activity.activityName);
    return [];
  };
  const barChartDataCount = () => {
    if (getProducts) return getProducts.map((product) => product.totalQuantity);
    if (getActivities) return getActivities.map((activity) => activity.count);
    return [];
  };

  const barChartSeries = [
    {
      data: barChartDataCount(),
      label: isWelder ? "Total Produzido" : "Total Realizado",
      color: isAssistant ? "#4caf50" : "#ff9800",
    },
  ];

  const barChartXAxis = [
    {
      data: barChartDataName(),
      scaleType: "band" as const,
      tickLabelStyle: {
        fontSize: 11,
        angle: 15,
        textAnchor: "start" as const,
      },
    },
  ];

  return (
    <main className={`${styles.detailContainer} mainContainer`}>
      <Breadcrumb />
      <section className={styles.headerGrid}>
        <div className={styles.employeeCard}>
          <div className={styles.iconWrapper}>
            <FaIdCard />
          </div>
          <div className={styles.info}>
            <h2 className={styles.name}>{employeeAnalysis.employees.name}</h2>
            <span className={styles.role}>{employeeAnalysis.employees.employeeRole}</span>
          </div>
        </div>
        <div className={`${styles.statCard} ${styles.highest}`}>
          <div className={styles.iconWrapper}>
            <FaArrowUp />
          </div>
          <div className={styles.info}>
            <span className={styles.label}>Produção passada</span>
            <span className={styles.value}>{lastProductionCount?.monthlyTotalProduction || 0} un</span>
            <span className={styles.subText}>{monthNames[lastProductionCount?.month || 0 - 1 || 1]}</span>
          </div>
        </div>
        <div className={`${styles.statCard} ${styles.lowest}`}>
          <div className={styles.iconWrapper}>
            <CiCalendar />
          </div>
          <div className={styles.info}>
            <span className={styles.label}>Produção atual</span>
            <span className={styles.value}>{employeeAnalysis.monthlyTotalProduction || 0} un</span>
            <span className={styles.subText}>{monthNames[employeeAnalysis.month || 1]}</span>
          </div>
        </div>
      </section>
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
      <section className={styles.chartCard}>
        <div className={styles.chartHeader}>
          <FaChartBar className={styles.chartIcon} />
          <h3>
            {isWelder ? "Produtos Mais Produzidos (Quantidade Anual)" : "Atividades Mais Realizadas (Quantidade Anual)"}
          </h3>
        </div>
        <div className={styles.chartWrapper}>
          <div className={styles.chartInnerWrapper}>
            <BarChart
              series={barChartSeries}
              xAxis={barChartXAxis}
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
          <span>← Arraste para ver todos os itens →</span>
        </div>
      </section>
    </main>
  );
};

export default EmployeeAnalysisDetail;
