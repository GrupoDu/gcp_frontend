"use client";

import styles from "./styles.module.scss";
import { FaChartLine } from "react-icons/fa";
import { LineChart } from "@mui/x-charts";
import { AnnualAnalysis } from "@/types/annualAnalysis.interface";
import { useFetch } from "@/hooks/useFetch";
import { months } from "@/Constants/months.constant";

const LineChartContainer = () => {
  const { data: annualAnalysis } = useFetch<AnnualAnalysis[]>("annualAnalysis");

  if (!annualAnalysis) {
    return (
      <div className={`${styles.linearChartContainer} ${styles.chartContainer}`}>
        <div className={styles.chartTitle}>
          <FaChartLine className={styles.chartIcon} />
          <h3>Gráfico de atividades</h3>
        </div>
        <h4>Nenhuma análise encontrada</h4>
      </div>
    );
  }

  return (
    <div className={`${styles.linearChartContainer} ${styles.chartContainer}`}>
      <div className={styles.chartTitle}>
        <FaChartLine className={styles.chartIcon} />
        <h3>Gráfico de atividades</h3>
      </div>

      <div className={styles.chartWrapper}>
        <LineChartAnalysis annualAnalysis={annualAnalysis} />
        <div className={styles.chartInnerWrapper}></div>
      </div>

      {/* Indicador de scroll apenas no mobile */}
      <div className={styles.scrollIndicator}>
        <span>← Arraste para ver todos os meses →</span>
      </div>
    </div>
  );
};

function LineChartAnalysis({ annualAnalysis }: { annualAnalysis?: AnnualAnalysis[] }) {
  const totalProduction = annualAnalysis?.map((item: AnnualAnalysis): number => item.totalProduction || 0);
  const monthsNames = annualAnalysis?.map((item: AnnualAnalysis) => months[item.month - 1] || "");
  const seriesData = [
    {
      data: totalProduction,
      label: "Produção total",
      color: "#2196f3",
    },
  ];
  const xAxisData = [
    {
      data: monthsNames,
      scaleType: "band",
      tickLabelStyle: {
        angle: 0,
        fontSize: 12,
      },
    },
  ] as const;
  const yAxisData = [
    {
      width: 40,
      tickLabelStyle: {
        fontSize: 11,
      },
    },
  ] as const;

  return (
    <LineChart
      series={seriesData}
      xAxis={xAxisData}
      yAxis={yAxisData}
      height={190}
      className={styles.linearChart}
      slotProps={{
        legend: {
          position: { vertical: "top" },
        },
      }}
    />
  );
}

export default LineChartContainer;
