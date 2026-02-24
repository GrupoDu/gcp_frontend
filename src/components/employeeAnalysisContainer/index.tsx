"use client";

import React from "react";
import styles from "./styles.module.scss";
import { BarChart } from "@mui/x-charts";
import { useEmployees } from "@/hooks/useEmployees";
import { FaChartLine } from "react-icons/fa";

interface EmployeeData {
  name: string;
  delivered: number;
  notDelivered: number;
  produced: number;
}

const EmployeeAnalysisContainer = () => {
  const { employeesData } = useEmployees();

  // Filtra apenas os soldadores e mapeia os dados necessários
  const weldersData: EmployeeData[] =
    employeesData
      ?.filter((employee) => employee.employee_type === "soldador")
      .map((employee) => ({
        name: employee.name || "Sem nome",
        delivered: employee.delivered_activities_quantity || 0,
        notDelivered: employee.not_delivered_activities_quantity || 0,
        produced: employee.products_produced_quantity || 0,
      })) || [];

  // Prepara os dados para o gráfico apenas com soldadores
  const employeesAnalysis = [
    {
      data: weldersData.map((w) => w.delivered),
      label: "Entregue",
      color: "#4caf50",
    },
    {
      data: weldersData.map((w) => w.notDelivered),
      label: "Não entregue",
      color: "#f44336",
    },
    {
      data: weldersData.map((w) => w.produced),
      label: "Produzido",
      color: "#2196f3",
    },
  ];

  const employeesNames = weldersData.map((w) => w.name);

  // Se não houver soldadores, mostra uma mensagem
  if (weldersData.length === 0) {
    return (
      <div className={styles.chartContainer}>
        <div className={styles.chartTitle}>
          <FaChartLine className={styles.chartIcon} />
          <h3>Gráfico de soldadores</h3>
        </div>
        <div className={styles.emptyState}>Nenhum soldador encontrado</div>
      </div>
    );
  }

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartTitle}>
        <FaChartLine className={styles.chartIcon} />
        <h3>Gráfico de soldadores ({weldersData.length})</h3>
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
            width={weldersData.length * 150} // 80px por soldador
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
