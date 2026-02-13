"use client";

import React from "react";
import styles from "./styles.module.scss";
import { GrAnalytics } from "react-icons/gr";
import { BarChart } from "@mui/x-charts";
import { useEmployees } from "@/hooks/useEmployees";

const EmployeeAnalysisContainer = () => {
  const { employeesData } = useEmployees();
  const employeesNames =
    employeesData?.map((employee) => employee.name ?? null) || [];

  const employeesAnalysis = [
    {
      data:
        employeesData?.map((employee) =>
          employee.employee_type === "soldador"
            ? (employee.delivered_activities_quantity ?? null)
            : null,
        ) || [],
      label: "Entregue",
      color: "#4caf50",
    },
    {
      data:
        employeesData?.map((employee) =>
          employee.employee_type === "soldador"
            ? (employee.not_delivered_activities_quantity ?? null)
            : null,
        ) || [],
      label: "Não entregue",
      color: "#f44336",
    },
    {
      data:
        employeesData?.map((employee) =>
          employee.employee_type === "soldador"
            ? (employee.products_produced_quantity ?? null)
            : null,
        ) || [],
        label: "Produzido",
        color: "#2196f3",
    },
  ];

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartTitle}>
        <GrAnalytics className={styles.chartIcon} />
        <h3>Gráfico de funcionários</h3>
      </div>
      <BarChart xAxis={[{ data: employeesNames }]} series={employeesAnalysis} />
    </div>
  );
};

export default EmployeeAnalysisContainer;
