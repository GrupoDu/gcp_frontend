"use client";

import styles from "./styles.module.scss";
import { RegisterAnalysisProvider } from "@/providers/registerAnalysis.provider";
import PieChartContainer from "../pieChartContainer";
import LineChartContainer from "../lineChartContainer";
import { AnualAnalysisProvider } from "@/providers/anualAnalysis.provider";

const ChartSection = () => {
  return (
    <div className={styles.chartSectionContainer}>
      <RegisterAnalysisProvider>
        <PieChartContainer />
      </RegisterAnalysisProvider>
      <AnualAnalysisProvider>
        <LineChartContainer />
      </AnualAnalysisProvider>
    </div>
  );
};

export default ChartSection;
