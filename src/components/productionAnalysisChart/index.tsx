"use client";

import styles from "./styles.module.scss";
import { ProductActivity } from "@/types/employeeAnalysis.interface";
import { Activity } from "@/types/assistantAnalysis.interface";
import { BarChart } from "@mui/x-charts";
import { FaChartBar } from "react-icons/fa";
import { useEmployeeAnalysis } from "@/hooks/useEmployeeAnalysis";

type ProductionAnalysisProps = {
  productActivity: ProductActivity[];
  generalActivity: number;
  activities: Activity[];
};

export const ProductionAnalysisChart = () => {
  const { employeeAnalysis, analysisFullYear } = useEmployeeAnalysis();
  const isProductActivityPopulated = !!employeeAnalysis.productActivity && employeeAnalysis.productActivity.length > 0;
  const isActivitiesPopulated = !!employeeAnalysis.activities && employeeAnalysis.activities.length > 0;
  const hasGeneralActivity = !!employeeAnalysis.generalActivity && employeeAnalysis.generalActivity > 0;

  const title = isProductActivityPopulated ? "Produtos" : isActivitiesPopulated ? "Atividades" : "";

  const xAxisProduct = isProductActivityPopulated
    ? employeeAnalysis.productActivity.map((activity) => activity.acronym)
    : [];

  const yAxisProduct = isProductActivityPopulated
    ? [
        {
          data: employeeAnalysis.productActivity.map((product) => product.totalProduction),
          label: "Produção total",
        },
      ]
    : [];

  const xAxisActivity = isActivitiesPopulated
    ? employeeAnalysis.activities.map((activity) => activity.activityType)
    : [];

  const yAxisActivity = isActivitiesPopulated
    ? [
        {
          data: employeeAnalysis.activities.map((activity) => activity.producedQuantity),
          label: "Produção total",
        },
      ]
    : [];

  const xAxis = isActivitiesPopulated ? xAxisActivity : xAxisProduct;

  const yAxis = isActivitiesPopulated ? yAxisActivity : yAxisProduct;

  return (
    <section className={styles.chartCard}>
      <div className={styles.title}>
        <FaChartBar className={styles.chartIcon} />
        <h3>Análise de {title}</h3>
      </div>
      <hr />
      <BarChart xAxis={[{ data: xAxis }]} series={yAxis} height={300} />
      {hasGeneralActivity && (
        <div className={styles.generalActivity}>
          <span>Atividade Geral: {employeeAnalysis.generalActivity} produções</span>
        </div>
      )}
    </section>
  );
};
