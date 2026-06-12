"use client";

import Link from "next/link";
import { FaChartLine } from "react-icons/fa";
import styles from "./styles.module.scss";
import React from "react";

export const AnalysisButton = ({ employee_uuid }: { employee_uuid: string }) => {
  return (
    <Link className={styles.analysisButtonContainer} href={employee_uuid}>
      <FaChartLine className={styles.chartIcon} />
    </Link>
  );
};
