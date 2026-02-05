"use client";

import styles from "./styles.module.scss";
import { LineChart } from "@mui/x-charts";
import { FaChartLine } from "react-icons/fa";
import { RegisterAnalysisProvider } from "@/providers/registerAnalysis.provider";
import PieChartContainer from "../pieChartContainer";

const ChartSection = () => {
  return (
    <div className={styles.chartSectionContainer}>
      <RegisterAnalysisProvider>
        <PieChartContainer />
      </RegisterAnalysisProvider>
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
