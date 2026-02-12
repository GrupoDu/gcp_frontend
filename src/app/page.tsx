import PageHeader from "@/components/ui/pageHeader";
import styles from "./page.module.scss";
import { MdDashboard } from "react-icons/md";
import { IoMdClipboard } from "react-icons/io";
import ChartSection from "@/components/chartSection";
import ProductionRegisterSection from "@/components/productionOrderSection";
import { LuGoal } from "react-icons/lu";
import GoalSection from "@/components/goalSection";
import { GoalProvider } from "@/providers/goal.provider";
import { RegisterAnalysisProvider } from "@/providers/productionOrderAnalysis.provider";

export default function Home() {
  return (
    <div className={styles.pageContainer}>
      <PageHeader HeaderIcon={MdDashboard} headerTitle="Dashboard" />
      <main className="mainContainer">
        <h2>Análises</h2>
        <RegisterAnalysisProvider>
          <ChartSection />
        </RegisterAnalysisProvider>
        <h2>
          <IoMdClipboard /> Registros de produção pendentes
        </h2>
        <ProductionRegisterSection />
        <h2>
          <LuGoal /> Metas
        </h2>
        <GoalProvider>
          <GoalSection />
        </GoalProvider>
      </main>
    </div>
  );
}
