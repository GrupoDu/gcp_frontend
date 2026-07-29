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
import { getSlug } from "@/utils/getSlug";

const ProductionOrderSection = () => {
  const { data } = useFetch<ProductionOrder[]>("productionOrder/filters?status=EmProducao");
  const productionOrderUuid = getSlug()[2];
  const productionOrders = data?.filter((order) => order.productionOrderUuid !== productionOrderUuid);

  let isProductionOrderPopulated = false;

  if (data && productionOrders) isProductionOrderPopulated = productionOrders.length > 0;

  return (
    <div className={styles.productionOrderSectionContainer}>
      <LinkButton href="/producao" Icon={FaExternalLinkAlt} color="black">
        Lista completa
      </LinkButton>
      <ul>
        {isProductionOrderPopulated ? (
          productionOrders?.map((order) => (
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
