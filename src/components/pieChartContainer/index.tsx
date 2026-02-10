"use client";

import styles from "./styles.module.scss";
import { GrAnalytics } from "react-icons/gr";
import { PieChart } from "@mui/x-charts";
import { useRegisterAnalysis } from "@/hooks/useRegisterAnalysis";

const PieChartContainer = () => {
  const { registerAnalysis } = useRegisterAnalysis();

  const analysisData = [
    {
      value: registerAnalysis?.deliveredRegisterQuantity || 0,
      label: "Concluido",
    },
    {
      value: registerAnalysis?.pendingRegisterQuantity || 0,
      label: "Pendente",
    },

    {
      value: registerAnalysis?.notDeliveredRegisterQuantity || 0,
      label: "Nao finalizado",
    },
  ];

  return (
    <div className={`${styles.pieChartContainer} ${styles.chartContainer}`}>
      <div className={styles.chartTitle}>
        <GrAnalytics className={styles.chartIcon} />
        <h3>Gráfico de atividades</h3>
      </div>
      <PieChart
        series={[
          {
            data: analysisData,
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
  );
};

export default PieChartContainer;
