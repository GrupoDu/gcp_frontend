"use client";

import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useGoalsAnalysis } from "@/hooks/useGoalsAnalysis";
import { FaFlag } from "react-icons/fa";
import styles from "./styles.module.scss";

export const GoalsPieChart: React.FC = () => {
  const { goalsAnalysis } = useGoalsAnalysis();

  const { goalsAchieved, goalsNotAchieved } = goalsAnalysis;

  const pieData = [
    { id: 0, value: goalsAchieved, label: "Batidas" },
    { id: 1, value: goalsNotAchieved, label: "Pendentes" },
  ];

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartTitle}>
        <FaFlag className={styles.chartIcon} />
        <h3>Análise de Metas</h3>
      </div>
      <div className={styles.pieChartWrapper}>
        <PieChart
          series={[
            {
              data: pieData,
              innerRadius: 30,
              outerRadius: 80,
              paddingAngle: 2,
              cornerRadius: 4,
            },
          ]}
          width={250}
          height={200}
          className={styles.pieChart}
        />
      </div>
    </div>
  );
};
