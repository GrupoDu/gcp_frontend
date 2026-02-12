"use client";

import styles from "./styles.module.scss";
import { ProductionOrderAnalysisProvider } from "@/providers/productionOrderAnalysis.provider";
import PieChartContainer from "../pieChartContainer";
import LineChartContainer from "../lineChartContainer";
import { AnualAnalysisProvider } from "@/providers/anualAnalysis.provider";

const ChartSection = () => {
  return (
    <div className={styles.chartSectionContainer}>
      <ProductionOrderAnalysisProvider>
        <PieChartContainer />
      </ProductionOrderAnalysisProvider>
      <AnualAnalysisProvider>
        <LineChartContainer />
      </AnualAnalysisProvider>
    </div>
  );
};

export default ChartSection;
