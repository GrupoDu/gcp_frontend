"use client";

import React from "react";
import styles from "./styles.module.scss";
import { useAnualAnalysis } from "@/hooks/useAnualAnalysis";
import { FaChartLine } from "react-icons/fa";
import { LineChart } from "@mui/x-charts";
import { AnualAnalysis } from "@/types/anualAnalysis.type";

const LineChartContainer = () => {
  const { anualAnalysis } = useAnualAnalysis();

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
        <div className={styles.chartInnerWrapper}>
          <LineChart
            series={[
              {
                data: anualAnalysis?.map(
                  (item: AnualAnalysis) => item.delivered || 0,
                ) as number[],
                label: "Concluído",
                color: "#4caf50",
              },
              {
                data: anualAnalysis?.map(
                  (item: AnualAnalysis) => item.not_delivered || 0,
                ) as number[],
                label: "Não finalizado",
                color: "#f44336",
              },
            ]}
            xAxis={[
              {
                data: anualAnalysis?.map(
                  (item: AnualAnalysis) => months[item.month - 1] || "",
                ),
                scaleType: "band",
                tickLabelStyle: {
                  angle: 0,
                  fontSize: 12,
                },
              },
            ]}
            yAxis={[
              {
                width: 40,
                tickLabelStyle: {
                  fontSize: 11,
                },
              },
            ]}
            height={190}
            className={styles.linearChart}
            slotProps={{
              legend: {
                position: { vertical: "top", horizontal: "middle" },
              },
            }}
          />
        </div>
      </div>

      {/* Indicador de scroll apenas no mobile */}
      <div className={styles.scrollIndicator}>
        <span>← Arraste para ver todos os meses →</span>
      </div>
    </div>
  );
};

export default LineChartContainer;
