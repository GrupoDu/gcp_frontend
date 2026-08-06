"use client";

import React from "react";
import styles from "./styles.module.scss";
import { BarChart } from "@mui/x-charts";
import { FaChartBar } from "react-icons/fa";
import { useFetch } from "@/hooks/useFetch";
import { Employee } from "@/types/employee.interface";

const EmployeeAnalysisContainer = ({ employeeRole }: { employeeRole: string }) => {
  const { data: employees } = useFetch<Employee[]>(`employee/filter?role=${employeeRole}`);

  if (!employees) {
    return (
      <div className={styles.chartContainer}>
        <div className={styles.chartTitle}>
          <FaChartBar className={styles.chartIcon} />
          <h3>Gráfico de soldadores</h3>
        </div>
        <div className={styles.emptyState}>Nenhum funcionário encontrado</div>
      </div>
    );
  }

  const employeesAnalysis = [
    {
      data: employees.map((w) => w.producedQuantity || 0),
      label: "Produzido",
      color: "#2196f3",
    },
  ];

  const employeesNames = employees?.map((employee) => employee.name) || [];

  // Se não houver soldadores, mostra aviso
  if (employeesAnalysis.length === 0 || !employees) {
    return (
      <div className={styles.chartContainer}>
        <div className={styles.chartTitle}>
          <FaChartBar className={styles.chartIcon} />
          <h3>Gráfico de soldadores</h3>
        </div>
        <div className={styles.emptyState}>Nenhum funcionário encontrado</div>
      </div>
    );
  }

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartTitle}>
        <FaChartBar className={styles.chartIcon} />
        <h3>
          Gráfico de {employeeRole} ({employees.length})
        </h3>
      </div>
      <div className={styles.chartWrapper}>
        <div className={styles.chartInnerWrapper}>
          <BarChart
            xAxis={[
              {
                data: employeesNames,
                scaleType: "band",
                tickLabelStyle: {
                  angle: employeesNames.length > 5 ? 45 : 0,
                  textAnchor: employeesNames.length > 5 ? "start" : "middle",
                  fontSize: 12,
                },
              },
            ]}
            series={employeesAnalysis}
            width={employees.length * 150}
            height={190}
            slotProps={{
              legend: {
                position: { vertical: "top" },
              },
            }}
            className={styles.barChart}
          />
        </div>
      </div>
      <div className={styles.scrollIndicator}>
        <span>← Arraste para ver todos os soldadores →</span>
      </div>
    </div>
  );
};

export default EmployeeAnalysisContainer;
