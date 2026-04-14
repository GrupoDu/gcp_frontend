"use client";

import styles from "./styles.module.scss";
import { GrAnalytics } from "react-icons/gr";
import { PieChart } from "@mui/x-charts";
import { useProductionOrderAnalysis } from "@/hooks/useProductionOrderAnalysis";
import { usePathname } from "next/navigation";

const PieChartContainer = () => {
  const { productionOrderAnalysis } = useProductionOrderAnalysis();
  const pathname = usePathname();

  const isAnalysisPage = pathname.includes("analises");

  const analysisData = [
    {
      value: productionOrderAnalysis?.deliveredRegisterQuantity || 0,
      label: "Concluido",
    },
    {
      value: productionOrderAnalysis?.pendingRegisterQuantity || 0,
      label: "Pendente",
    },

    {
      value: productionOrderAnalysis?.notDeliveredRegisterQuantity || 0,
      label: "Não finalizado",
    },
  ];

  return (
    <div
      className={`${styles.pieChartContainer} ${styles.chartContainer} ${isAnalysisPage && styles.pieChartContainerAnalysis}`}
    >
      <div className={styles.chartTitle}>
        <GrAnalytics className={styles.chartIcon} />
        <h3>Gráfico de atividades</h3>
      </div>
      <PieChart
        series={[
          {
            data: analysisData,
            innerRadius: 30,
            paddingAngle: 2,
            cornerRadius: 4,
          },
        ]}
        slotProps={{
          legend: {
            direction: "vertical",
            position: { vertical: "middle", horizontal: "center" },
          },
        }}
        width={250}
        height={200}
        className={styles.pieChart}
      />
    </div>
  );
};

export default PieChartContainer;
