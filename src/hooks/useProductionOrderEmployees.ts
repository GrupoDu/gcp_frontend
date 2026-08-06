import { Employee } from "@/types/employee.interface";
import { useFetch } from "./useFetch";
import { ProductionOrder } from "@/types/productionOrder.interface";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function useRegisterEmployees(): { welder: Employee | undefined } {
  const pathname = usePathname();
  const registerId = pathname.split("/")[2];
  const { data: employeesData } = useFetch<Employee[]>("employee");
  const { data: allProductionOrders } = useFetch<ProductionOrder>("productionOrder/", registerId);
  const [welder, setWelder] = useState<Employee>();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setWelder(employeesData?.find((employee) => employee.employeeUuid === allProductionOrders?.welders?.employeeUuid));
  }, [employeesData, allProductionOrders]);

  return {
    welder,
  };
}
