import { Employee } from "@/types/employee.type";
import { useFetch } from "./useFetch";
import { ProductionOrder } from "@/types/productionOrder.type";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function useRegisterEmployees() {
  const pathname = usePathname();
  const registerId = pathname.split("/")[2];
  const { data: employeesData } = useFetch<Employee[]>("employees");
  const { data: allProductionOrders } = useFetch<ProductionOrder>("productionOrder/", registerId);
  const [welder, setWelder] = useState<Employee>();
  const [cutAssistant, setCutAssistant] = useState<Employee>();
  const [foldAssistant, setFoldAssistant] = useState<Employee>();
  const [finishingAssistant, setFinishingAssistant] = useState<Employee>();
  const [paintAssistant, setPaintAssistant] = useState<Employee>();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setWelder(employeesData?.find((employee) => employee.employee_id === allProductionOrders?.employee_uuid));
    setCutAssistant(employeesData?.find((employee) => employee.employee_id === allProductionOrders?.cut_assistant));
    setFoldAssistant(employeesData?.find((employee) => employee.employee_id === allProductionOrders?.fold_assistant));
    setFinishingAssistant(
      employeesData?.find((employee) => employee.employee_id === allProductionOrders?.finishing_assistant),
    );
    setPaintAssistant(employeesData?.find((employee) => employee.employee_id === allProductionOrders?.paint_assistant));
  }, [employeesData, allProductionOrders]);

  return {
    welder,
    cutAssistant,
    foldAssistant,
    finishingAssistant,
    paintAssistant,
  };
}
