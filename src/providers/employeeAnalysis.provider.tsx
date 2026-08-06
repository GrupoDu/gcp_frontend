"use client";

import { EmployeeAnalysisContext } from "@/context/employeeAnalysis.context";
import { useEffect, useMemo, useState } from "react";
import { EmployeeAnalysis, EmployeeAnalysisFullYear } from "@/types/employeeAnalysis.interface";
import { toast } from "react-toastify";
import { api } from "@/services/api";

export const EmployeeAnalysisProvider = ({
  children,
  employeeUuid,
  employeeRole,
}: {
  children: React.ReactNode;
  employeeUuid: string;
  employeeRole: string;
}) => {
  const [analysis, setAnalysis] = useState<EmployeeAnalysis>({
    employee: {
      employeeUuid: "",
      name: "",
      employeeRole: "",
      producedQuantity: 0,
    },
    monthlyTotalProduction: 0,
    month: 0,
    year: 0,
    productActivity: [],
    activities: [],
    generalActivity: 0,
  });
  const [fullYearAnalysis, setFullYearAnalysis] = useState<EmployeeAnalysisFullYear[]>([
    {
      month: 0,
      monthlyProduction: 0,
    },
  ]);

  useEffect(() => {
    async function fetchAnalysis() {
      try {
        const role = employeeRole === "Assistente" ? "assistant" : "welder";
        const resAnalysis = await api.get(`employeeAnalysis/${role}/${employeeUuid}`);
        const resFullYear = await api.get(`employeeAnalysis/${role}/fullYear/${employeeUuid}`);

        setAnalysis(resAnalysis.data.data);
        setFullYearAnalysis(resFullYear.data.data);
      } catch (e) {
        const err = e as Error;
        console.error(err.message);
        toast.error(err.message);
      }
    }

    fetchAnalysis();
  }, [employeeRole, employeeUuid]);

  const employeeAnalysis = useMemo(
    () => ({
      employeeAnalysis: analysis,
      analysisFullYear: fullYearAnalysis,
    }),
    [analysis, fullYearAnalysis],
  );

  return <EmployeeAnalysisContext value={employeeAnalysis}>{children}</EmployeeAnalysisContext>;
};
