"use client";

import styles from "./styles.module.scss";
import LinkButton from "../linkButton";
import { FaExternalLinkAlt } from "react-icons/fa";
import CardProductionOrder from "../ui/cardProductionOrder";
import { useFetch } from "@/hooks/useFetch";
import { ProductionOrder } from "@/types/productionOrder.type";
import { dataFormater } from "@/utils/dataFormater";
import { useEffect, useMemo, useRef } from "react";

const ProductionOrderSection = () => {
  const { data, refetch } = useFetch<ProductionOrder[]>("production-orders");
  const initialFetchDone = useRef(false);
  const title = (production_order: ProductionOrder) => {
    return `${production_order?.quantity_to_produce} ${production_order?.products?.acronym}` || "";
  };

  const pendingProductionOrders = useMemo(
    () => data?.filter((order) => order.production_order_status === "Pendente") || [],
    [data],
  );

  useEffect(() => {
    if (!initialFetchDone.current) {
      initialFetchDone.current = true;
      refetch();
    }
  }, [refetch]);

  const isPendingProductionOrderPopulated = pendingProductionOrders.length > 0;

  return (
    <div className={styles.productionOrderSectionContainer}>
      <LinkButton href="/producao" Icon={FaExternalLinkAlt} color="black">
        Lista completa
      </LinkButton>
      <ul>
        {isPendingProductionOrderPopulated ? (
          pendingProductionOrders?.map((order) => (
            <li key={order.production_order_uuid}>
              <CardProductionOrder
                register_id={order.production_order_uuid || ""}
                status={order.production_order_status}
                title={title(order)}
                date={dataFormater(order.production_order_deadline)}
                description={order.production_order_description || ""}
              />
            </li>
          ))
        ) : (
          <h3>Nenhum registro pendente</h3>
        )}
      </ul>
    </div>
  );
};

export default ProductionOrderSection;
