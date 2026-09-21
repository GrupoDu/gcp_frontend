"use client";

import styles from "./styles.module.scss";
import CardProductionOrder from "../ui/cardProductionOrder";
import { dataFormater } from "@/utils/dataFormater";
import { ProductionOrder } from "@/types/productionOrder.interface";
import { useFetch } from "@/hooks/useFetch";
import DataNotFound from "@/components/dataNotFound";
import { titleFormatter } from "@/utils/titleFormatter";

const ProductionOrderList = () => {
  const { data: productionOrders, refetch } = useFetch<ProductionOrder[]>("productionOrder");
  const isListEmpty = !productionOrders || productionOrders.length < 1;

  return (
    <ul className={`${styles.cardListContainer} ${isListEmpty && styles.emptyList}`}>
      {isListEmpty && <DataNotFound />}
      {productionOrders &&
        productionOrders?.map((order) => (
          <li key={order.uuid}>
            <CardProductionOrder
              productionOrderUuid={order.uuid ?? ""}
              date={dataFormater(order.deadline)}
              deliveryDate={order.deliveredAt}
              description={order.description ?? ""}
              name={order.product.name}
              productDescription={order.product.description}
              title={titleFormatter(order.product.acronym, order.toBeProduced)}
              status={order.status}
              registerId={order?.uuid ?? ""}
              refetch={refetch}
            />
          </li>
        ))}
    </ul>
  );
};

export default ProductionOrderList;
