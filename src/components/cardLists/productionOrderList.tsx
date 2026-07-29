"use client";

import styles from "./styles.module.scss";
import CardProductionOrder from "../ui/cardProductionOrder";
import { dataFormater } from "@/utils/dataFormater";
import { useSearchParams } from "next/navigation";
import { ProductionOrder } from "@/types/productionOrder.interface";
import { useFetch } from "@/hooks/useFetch";
import DataNotFound from "@/components/dataNotFound";
import { titleFormatter } from "@/utils/titleFormatter";
import { useLoading } from "@/hooks/useLoading";

const ProductionOrderList = () => {
  const { data: productionOrders, refetch } = useFetch<ProductionOrder[]>("productionOrder");
  const { isLoading } = useLoading();
  const searchParams = useSearchParams();
  const productFilter = searchParams.get("product");
  const statusFilter = searchParams.get("status");
  const deadlineFilter = searchParams.get("deadline");
  const employeeFilter = searchParams.get("employee");
  const isListEmpty = !productionOrders || productionOrders.length < 1;

  return (
    <ul className={`${styles.cardListContainer} ${isListEmpty && styles.emptyList}`}>
      {isListEmpty && <DataNotFound />}
      {productionOrders &&
        productionOrders?.map((order) => (
          <li key={order.productionOrderUuid}>
            <CardProductionOrder
              date={dataFormater(order.productionOrderDeadline)}
              description={order.productionOrderDescription || ""}
              title={titleFormatter(order.product.acronym, order.toBeProduced)}
              status={order.productionOrderStatus}
              registerId={order?.productionOrderUuid || ""}
              refetch={refetch}
            />
          </li>
        ))}
    </ul>
  );
};

export default ProductionOrderList;
