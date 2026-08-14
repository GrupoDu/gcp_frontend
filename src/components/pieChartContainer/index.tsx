"use client";

import styles from "./styles.module.scss";
import { GrAnalytics } from "react-icons/gr";
import { PieChart } from "@mui/x-charts";
import { usePathname } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";
import { ProductionOrderAnalysis } from "@/types/productionOrderAnalysis.interface";

const PieChartContainer = () => {
  const { data: productionOrderAnalysis } = useFetch<ProductionOrderAnalysis>("productionOrderAnalysis");
  const pathname = usePathname();

  const isAnalysisPage = pathname.includes("analises");

  const analysisData = [
    {
      value: productionOrderAnalysis?.deliveredQuantity || 0,
      label: "Concluido",
      color: "#009688",
    },
    {
      value: productionOrderAnalysis?.pendingQuantity || 0,
      label: "Em Produção",
      color: "#FFD079",
    },

    {
      value: productionOrderAnalysis?.notDeliveredQuantity || 0,
      label: "Atrasado",
      color: "#d32f2f",
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
