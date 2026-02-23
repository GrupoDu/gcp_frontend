"use client";

import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import { useAnualAnalysis } from "@/hooks/useAnualAnalysis";
import { FaChartLine } from "react-icons/fa";
import { LineChart } from "@mui/x-charts";
import { AnualAnalysis } from "@/types/anualAnalysis.type";

const LineChartContainer = () => {
  const { anualAnalysis, status, err } = useAnualAnalysis();

  const months = [
    "Janeiro",
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
  ];

  if (!anualAnalysis || anualAnalysis === undefined) {
    return (
      <div
        className={`${styles.linearChartContainer} ${styles.chartContainer}`}
      >
        <div className={styles.chartTitle}>
          <FaChartLine className={styles.chartIcon} />
          <h3>Gráfico de atividades</h3>
        </div>
        <h4>Nenhuma analise encontrada</h4>
      </div>
    );
  }

  return (
    <div className={`${styles.linearChartContainer} ${styles.chartContainer}`}>
      <div className={styles.chartTitle}>
        <FaChartLine className={styles.chartIcon} />
        <h3>Gráfico de atividades</h3>
      </div>
      <LineChart
        style={{
          height: "100%",
        }}
        series={[
          {
            data: anualAnalysis?.map(
              (item: AnualAnalysis) => item.delivered || [],
            ) as number[],
            label: "Concluído",
          },
          {
            data: anualAnalysis?.map(
              (item: AnualAnalysis) => item.not_delivered || [],
            ) as number[],
            label: "Não finalizado",
          },
        ]}
        alignmentBaseline="baseline"
        xAxis={[
          {
            data: anualAnalysis?.map(
              (item: AnualAnalysis) => months[item.month - 1] || [],
            ),
            scaleType: "band",
            height: 40,
          },
        ]}
        yAxis={[{ width: 40 }]}
        height={200}
        className={styles.linearChart}
      />
    </div>
  );
};

export default LineChartContainer;
