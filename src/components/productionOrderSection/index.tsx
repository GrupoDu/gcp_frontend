"use client";

import styles from "./styles.module.scss";
import LinkButton from "../linkButton";
import { FaExternalLinkAlt } from "react-icons/fa";
import CardProductionOrder from "../ui/cardProductionOrder";
import { useFetch } from "@/hooks/useFetch";
import { ProductionOrder } from "@/types/productionOrder.interface";
import { dataFormater } from "@/utils/dataFormater";
import { titleFormatter } from "@/utils/titleFormatter";
import { usePathname } from "next/navigation";

const ProductionOrderSection = () => {
  const { data } = useFetch<ProductionOrder[]>("productionOrder/filters?status=EmProducao");
  const pathname = usePathname();
  const productionOrderUuid = pathname.split("/")[2];
  const productionOrders = data?.filter((order) => order.productionOrderUuid !== productionOrderUuid);

  return (
    <div className={styles.productionOrderSectionContainer}>
      <LinkButton href="/producao" Icon={FaExternalLinkAlt} color="black">
        Lista completa
      </LinkButton>
      <ul>
        <DisplayProductionOrders data={data} productionOrders={productionOrders} />
      </ul>
    </div>
  );
};

type DisplayProductionOrdersProps = {
  data: ProductionOrder[] | undefined;
  productionOrders: ProductionOrder[] | undefined;
};

function DisplayProductionOrders({ data, productionOrders }: DisplayProductionOrdersProps) {
  let isProductionOrderPopulated = false;

  if (data && productionOrders) isProductionOrderPopulated = productionOrders.length > 0;

  if (!isProductionOrderPopulated) return <h3>Nenhum registro pendente</h3>;

  return productionOrders?.map((order) => (
    <li key={order.productionOrderUuid}>
      <CardProductionOrder
        registerId={order.productionOrderUuid || ""}
        status={order.productionOrderStatus}
        title={titleFormatter(order.product.acronym, order.toBeProduced)}
        date={dataFormater(order.productionOrderDeadline)}
        deliveryDate={order.deliveredAt}
        description={order.productionOrderDescription || ""}
      />
    </li>
  ));
}

export default ProductionOrderSection;
