import React from "react";
import styles from "./page.module.scss";
// @ts-expect-error tipagem chata do ts
import "../../globals.scss";
import { FaGears } from "react-icons/fa6";
import PageHeader from "@/components/ui/pageHeader";

const AnalysisPage = () => {
  return (
    <div className={styles.pageContainer}>
      <PageHeader headerTitle="Análises" HeaderIcon={FaGears} />
      <main className={`${styles.mainContainer} mainContainer`}>
        <h2>Página de analises em desenvolvimento...</h2>
        <FaGears className={styles.gearIcon} />
      </main>
    </div>
  );
};

export default AnalysisPage;
