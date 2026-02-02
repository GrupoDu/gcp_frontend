"use client";

import { GrAnalytics } from "react-icons/gr";
import styles from "./styles.module.scss";
import { LineChart, PieChart } from "@mui/x-charts";
import { FaChartLine } from "react-icons/fa";

const ChartSection = () => {
  const fakeData = [
    {
      value: 50,
      label: "Pendente",
    },
    {
      value: 72,
      label: "Concluido",
    },
    {
      value: 28,
      label: "Não finalizado",
    },
  ];

  return (
    <div className={styles.chartSectionContainer}>
      <div className={`${styles.pieChartContainer} ${styles.chartContainer}`}>
        <div className={styles.chartTitle}>
          <GrAnalytics className={styles.chartIcon} />
          <h3>Gráfico de atividades</h3>
        </div>
        <PieChart
          series={[
            {
              data: fakeData,
              innerRadius: 10,
            },
          ]}
          slotProps={{
            legend: {
              direction: "vertical",
              position: { vertical: "middle", horizontal: "center" },
            },
          }}
          width={100}
          height={100}
          className={styles.pieChart}
        />
      </div>
      <div
        className={`${styles.linearChartContainer} ${styles.chartContainer}`}
      >
        <div className={styles.chartTitle}>
          <FaChartLine className={styles.chartIcon} />
          <h3>Gráfico de atividades</h3>
        </div>
        <LineChart
          style={{
            height: "100%",
            // padding: "0",
            // margin: "0",
            // boxSizing: "border-box",
          }}
          series={[
            {
              data: [50, 72, 28, 45, 60],
              label: "Pendente",
            },
            {
              data: [30, 45, 60, 25, 40],
              label: "Concluido",
            },
            {
              data: [20, 35, 50, 15, 30],
              label: "Não finalizado",
            },
          ]}
          alignmentBaseline="baseline"
          xAxis={[
            {
              data: ["Jan", "Fev", "Mar", "Abr", "Mai"], // Rótulos do eixo X
              scaleType: "band",
              height: 40,
            },
          ]}
          yAxis={[{ width: 40 }]}
          height={200}
          className={styles.linearChart}
        />
      </div>
    </div>
  );
};

export default ChartSection;
