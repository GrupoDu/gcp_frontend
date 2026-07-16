"use client";

import styles from "./styles.module.scss";
import CardProductionOrder from "../ui/cardProductionOrder";
import { dataFormater } from "@/utils/dataFormater";
import { useSearchParams } from "next/navigation";
import { ProductionOrder } from "@/types/productionOrder.interface";
import { useFetch } from "@/hooks/useFetch";
import DataNotFound from "@/components/dataNotFound";

const ProductionOrderList = () => {
  const { data: productionOrders, refetch } = useFetch<ProductionOrder[]>("production-order");
  const searchParams = useSearchParams();
  const productFilter = searchParams.get("product");
  const statusFilter = searchParams.get("status");
  const deadlineFilter = searchParams.get("deadline");
  const employeeFilter = searchParams.get("employee");
  const filteredList = productionOrders?.filter(
    (order) =>
      order.products.name === productFilter &&
      order.productionOrderStatus === statusFilter &&
      order.productionOrderDeadline.toISOString() === deadlineFilter &&
      order.welders?.employeeUuid === employeeFilter,
  );
  const isListEmpty = !productionOrders || productionOrders.length < 1;

  return (
    <ul className={`${styles.cardListContainer} ${isListEmpty && styles.emptyList}`}>
      {displayProductionOrders(refetch, productionOrders)}
    </ul>
  );
};

function displayProductionOrders(refetch: () => void, orders?: ProductionOrder[]) {
  if (!orders || orders.length < 1) return <DataNotFound />;

  orders?.map((order) => (
    <li key={order.productionOrderUuid}>
      <CardProductionOrder
        date={dataFormater(order.productionOrderDeadline)}
        description={order.productionOrderDescription || ""}
        title={formatTitle(order)}
        status={order.productionOrderStatus}
        registerId={order?.productionOrderUuid || ""}
        refetch={refetch}
      />
    </li>
  ));
}

function formatTitle(production_order: ProductionOrder) {
  return `${production_order.toBeProduced} ${production_order.products.acronym}`;
}

export default ProductionOrderList;
