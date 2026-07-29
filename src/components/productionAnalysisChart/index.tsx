"use client";

import styles from "./styles.module.scss";
import { ProductActivity } from "@/types/employeeAnalysis.interface";
import { Activity } from "@/types/assistantAnalysis.interface";
import { BarChart } from "@mui/x-charts";
import { FaChartBar } from "react-icons/fa";

type ProductionAnalysisProps = {
  productActivity: ProductActivity[];
  generalActivity: number;
  activities: Activity[];
};

export const ProductionAnalysisChart = ({ productActivity, activities, generalActivity }: ProductionAnalysisProps) => {
  const isProductActivityPopulated = !!productActivity && productActivity.length > 0;
  const isActivitiesPopulated = !!activities && activities.length > 0;
  const hasGeneralActivity = !!generalActivity && generalActivity > 0;

  const title = isProductActivityPopulated ? "Produtos" : isActivitiesPopulated ? "Atividades" : "";

  const xAxisProduct = isProductActivityPopulated ? productActivity.map((activity) => activity.acronym) : [];

  const yAxisProduct = isProductActivityPopulated
    ? [
        {
          data: productActivity.map((product) => product.totalProduction),
          label: "Produção total",
        },
      ]
    : [];

  const xAxisActivity = isActivitiesPopulated ? activities.map((activity) => activity.activityType) : [];

  const yAxisActivity = isActivitiesPopulated
    ? [
        {
          data: activities.map((activity) => activity.producedQuantity),
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
          <span>Atividade Geral: {generalActivity} produções</span>
        </div>
      )}
    </section>
  );
};
