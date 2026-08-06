"use client";

import { CiCalendar } from "react-icons/ci";
import styles from "./styles.module.scss";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { FaIdCard } from "react-icons/fa";
import { useEmployeeAnalysis } from "@/hooks/useEmployeeAnalysis";
import { months } from "@/Constants/months.constant";

export const EmployeeAnalysisHeader = () => {
  const { employeeAnalysis, analysisFullYear } = useEmployeeAnalysis();
  const actualMonth = employeeAnalysis.month;
  const lastProductionCount = analysisFullYear.find((analysis) => analysis.month === actualMonth - 1);

  return (
    <section className={styles.headerGrid}>
      <div className={styles.employeeCard}>
        <div className={styles.iconWrapper}>
          <FaIdCard />
        </div>
        <div className={styles.info}>
          <h2 className={styles.name}>{employeeAnalysis.employee.name}</h2>
          <span className={styles.role}>{employeeAnalysis.employee.employeeRole}</span>
        </div>
      </div>
      <div className={`${styles.statCard} ${styles.last}`}>
        <div className={styles.iconWrapper}>
          <CiCalendar />
        </div>
        <div className={styles.info}>
          <span className={styles.label}>Produção passada</span>
          <span className={styles.value}>{lastProductionCount?.monthlyProduction || 0} un</span>
          <span className={styles.subText}>{months[lastProductionCount?.month || 0 - 1 || 1]}</span>
        </div>
      </div>
      <div className={`${styles.statCard} ${styles.current}`}>
        <div className={styles.iconWrapper}>
          <FaArrowDown />
        </div>
        <div className={styles.info}>
          <span className={styles.label}>Produção atual</span>
          <span className={styles.value}>{employeeAnalysis.monthlyTotalProduction || 0} un</span>
          <span className={styles.subText}>{months[employeeAnalysis.month - 1 || 1]}</span>
        </div>
      </div>
    </section>
  );
};
