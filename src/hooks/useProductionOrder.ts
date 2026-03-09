import { ProductionOrderContext } from "@/context/productionOrder.context";
import { useContext } from "react";

export function useProductionOrders() {
  const productionOrderContext = useContext(ProductionOrderContext);

  if (!productionOrderContext) throw new Error("useRegister deve ser usado com um Provider.");

  return productionOrderContext;
}
