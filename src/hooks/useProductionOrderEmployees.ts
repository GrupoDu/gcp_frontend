import { Employee } from "@/types/employee.type";
import { useFetch } from "./useFetch";
import { ProductionOrder } from "@/types/productionOrder.type";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function useRegisterEmployees(): { welder: Employee | undefined } {
  const pathname = usePathname();
  const registerId = pathname.split("/")[2];
  const { data: employeesData } = useFetch<Employee[]>("employees");
  const { data: allProductionOrders } = useFetch<ProductionOrder>("production-orders/", registerId);
  const [welder, setWelder] = useState<Employee>();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setWelder(
      employeesData?.find((employee) => employee.employee_uuid === allProductionOrders?.welders?.employee_uuid),
    );
  }, [employeesData, allProductionOrders]);

  return {
    welder,
  };
}
