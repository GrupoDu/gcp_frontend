"use client";

import styles from "./page.module.scss";
import PageHeader from "@/components/ui/pageHeader";
import { MdDashboard } from "react-icons/md";
import "../../globals.scss";
import { IoMdClipboard } from "react-icons/io";
import ProductionOrderSection from "@/components/productionOrderSection";
import { LuGoal } from "react-icons/lu";
import GoalSection from "@/components/goalSection";
import Loading from "@/components/ui/loading";
import PieChartContainer from "@/components/pieChartContainer";
import LineChartContainer from "@/components/lineChartContainer";
import { useLoading } from "@/hooks/useLoading";

export default function DashboardPage() {
  const { isLoading } = useLoading();

  return (
    <div className="pageContainer">
      <PageHeader HeaderIcon={MdDashboard} headerTitle="Dashboard" />
      {isLoading && <Loading />}
      <main style={{ gap: "1rem" }} className={`mainContainer ${isLoading && "loading"}`}>
        <h2>Análises</h2>
        <div className={styles.chartSectionContainer}>
          <PieChartContainer />
          <LineChartContainer />
        </div>
        <h2>
          <IoMdClipboard /> Ordens de produção pendentes
        </h2>
        <ProductionOrderSection />
        <h2>
          <LuGoal /> Metas
        </h2>
        <GoalSection />
      </main>
    </div>
  );
}
