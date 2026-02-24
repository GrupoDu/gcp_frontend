import styles from "./page.module.scss";
// @ts-expect-error tipagem chata do ts
import "../../globals.scss";
import { FaGears } from "react-icons/fa6";
import PageHeader from "@/components/ui/pageHeader";
import AnalyticsContainer from "@/components/analyticsContainer";

const AnalysisPage = () => {
  return (
    <div className={styles.pageContainer}>
      <PageHeader headerTitle="Análises" HeaderIcon={FaGears} />
      <main className={`${styles.mainContainer} mainContainer`}>
        <h2>Análises</h2>
        <AnalyticsContainer />
      </main>
    </div>
  );
};

export default AnalysisPage;
