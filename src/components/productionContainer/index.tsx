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
            <li key={order.uuid}>
              <CardProductionOrder
                productionOrderUuid={order.uuid ?? ""}
                date={dataFormater(order.deadline)}
                deliveryDate={order.deliveredAt}
                description={order.description || ""}
                productDescription={order.product.description || "Produto sem descrição"}
                name={order.product.name}
                title={titleFormatter(order.product.acronym, order.toBeProduced)}
                status={order.status}
                registerId={order?.uuid || ""}
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
