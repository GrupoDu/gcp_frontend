"use client";

import styles from "./styles.module.scss";
import ListFooter from "@/components/listFooter";
import DataNotFound from "@/components/dataNotFound";
import { useFetch } from "@/hooks/useFetch";
import { ProductionOrder } from "@/types/productionOrder.interface";
import { useSearchParams } from "next/navigation";
import CardProductionOrder from "@/components/ui/cardProductionOrder";
import { dataFormater } from "@/utils/dataFormater";
import { titleFormatter } from "@/utils/titleFormatter";

const ProductionContainer = () => {
  const searchParams = useSearchParams();
  const hasFilters = searchParams.size > 0;
  const endpoint = `productionOrder${hasFilters ? `/filter?${searchParams.toString()}` : ""}`;
  const { data: productionOrders, refetch } = useFetch<ProductionOrder[]>(endpoint);
  const isListEmpty = !productionOrders || productionOrders.length < 1;

  return (
    <>
      <ul className={`${styles.cardListContainer} ${isListEmpty && styles.emptyList}`}>
        {isListEmpty && <DataNotFound />}
        {productionOrders &&
          productionOrders.map((order) => (
            <li key={order.productionOrderUuid}>
              <CardProductionOrder
                productionOrderUuid={order.productionOrderUuid ?? ""}
                date={dataFormater(order.productionOrderDeadline)}
                deliveryDate={order.deliveredAt}
                description={order.productionOrderDescription || ""}
                title={titleFormatter(order.product.acronym, order.toBeProduced)}
                status={order.productionOrderStatus}
                registerId={order?.productionOrderUuid || ""}
                refetch={refetch}
              />
            </li>
          ))}
      </ul>
      <ListFooter status={["Em Produção", "Entregue", "Atrasado"]} />
    </>
  );
};

export default ProductionContainer;
