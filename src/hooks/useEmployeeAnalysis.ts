import { useContext } from "react";
import { EmployeeAnalysisContext } from "@/context/employeeAnalysis.context";

export const useEmployeeAnalysis = () => {
  const employeeAnalysis = useContext(EmployeeAnalysisContext);

  if (!employeeAnalysis) throw new Error("useEmployeeAnalysis deve ser usado com um provider");

  return employeeAnalysis;
};
