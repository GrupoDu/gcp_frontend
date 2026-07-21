"use client";

import styles from "./styles.module.scss";
import LinkButton from "../linkButton";
import { FaExternalLinkAlt } from "react-icons/fa";
import CardProductionOrder from "../ui/cardProductionOrder";
import { useFetch } from "@/hooks/useFetch";
import { ProductionOrder } from "@/types/productionOrder.interface";
import { dataFormater } from "@/utils/dataFormater";
import { useEffect, useRef } from "react";
import { titleFormatter } from "@/utils/titleFormatter";

const ProductionOrderSection = () => {
  const { data, refetch } = useFetch<ProductionOrder[]>("productionOrder/filters?status=Aguardando");
  const initialFetchDone = useRef(false);
  const title = (productionOrder: ProductionOrder) =>
    `${productionOrder?.toBeProduced} ${productionOrder?.product?.acronym}` || "";

  useEffect(() => {
    if (!initialFetchDone.current) {
      initialFetchDone.current = true;
      refetch();
    }
  }, [refetch]);

  let isProductionOrderPopulated = false;

  if (data) isProductionOrderPopulated = data.length > 0;

  return (
    <div className={styles.productionOrderSectionContainer}>
      <LinkButton href="/producao" Icon={FaExternalLinkAlt} color="black">
        Lista completa
      </LinkButton>
      <ul>
        {isProductionOrderPopulated ? (
          data?.map((order) => (
            <li key={order.productionOrderUuid}>
              <CardProductionOrder
                registerId={order.productionOrderUuid || ""}
                status={order.productionOrderStatus}
                title={titleFormatter(order.product.acronym, order.toBeProduced)}
                date={dataFormater(order.productionOrderDeadline)}
                description={order.productionOrderDescription || ""}
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
