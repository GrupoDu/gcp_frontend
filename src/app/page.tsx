import PageHeader from "@/components/ui/pageHeader";
import styles from "./page.module.scss";
import { MdDashboard } from "react-icons/md";
import { IoMdClipboard } from "react-icons/io";
import ChartSection from "@/components/chartSection";
import ProductionRegisterSection from "@/components/productionRegisterSection";
import { LuGoal } from "react-icons/lu";
import GoalSection from "@/components/goalSection";
import { RegisterAnalysisProvider } from "@/providers/registerAnalysis.provider";

export default function Home() {
  return (
    <div className={styles.pageContainer}>
      <PageHeader HeaderIcon={MdDashboard} headerTitle="Dashboard" />
      <main className={styles.mainContainer}>
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
        <GoalSection />
      </main>
    </div>
  );
}
