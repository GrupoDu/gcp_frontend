"use client";

import styles from "./styles.module.scss";
import CardProductionOrder from "../ui/cardProductionOrder";
import { dataFormater } from "@/utils/dataFormater";
import { useSearchParams } from "next/navigation";
import { ProductionOrder } from "@/types/productionOrder.type";
import { useFetch } from "@/hooks/useFetch";
import DataNotFound from "@/components/dataNotFound";
import { useEffect } from "react";

const ProductionOrderList = () => {
  const { data: productionOrders, refetch } = useFetch<ProductionOrder[]>("production-orders");
  const searchParams = useSearchParams();
  const productFilter = searchParams.get("product");
  const statusFilter = searchParams.get("status");
  const deadlineFilter = searchParams.get("deadline");
  const employeeFilter = searchParams.get("employee");
  const isListEmpty = !productionOrders || productionOrders.length < 1;

  useEffect(() => {
    console.log(productionOrders);
  }, [productionOrders]);

  return (
    <ul className={`${styles.cardListContainer} ${isListEmpty && styles.emptyList}`}>
      {displayProductionOrders(refetch, productionOrders)}
    </ul>
  );
};

function displayProductionOrders(refetch: () => void, orders?: ProductionOrder[]) {
  if (!orders || orders.length < 1) return <DataNotFound />;

  return orders?.map((order) => (
    <li key={order.production_order_uuid}>
      <CardProductionOrder
        date={dataFormater(order.production_order_deadline)}
        description={order.production_order_description || ""}
        title={formatTitle(order)}
        status={order.production_order_status}
        register_id={order?.production_order_uuid || ""}
        refetch={refetch}
      />
    </li>
  ));
}

function formatTitle(production_order: ProductionOrder) {
  return `${production_order.quantity_to_produce} ${production_order.products.acronym}`;
}

export default ProductionOrderList;
