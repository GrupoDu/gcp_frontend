"use client";

import styles from "./styles.module.scss";
import LinkButton from "../linkButton";
import { FaExternalLinkAlt } from "react-icons/fa";
import CardRegister from "../ui/cardRegister";
import { useFetch } from "@/hooks/useFetch";
import { ProductionOrder } from "@/types/productionOrder.type";
import { dataFormater } from "@/utils/dataFormater";
import { useEffect, useState } from "react";

const ProductionOrderSection = () => {
  const { data } = useFetch<ProductionOrder[]>(
    "http://localhost:8000/productionOrder",
  );
  const [registers, setRegisters] = useState<ProductionOrder[]>([]);
  const isPendingProductionOrderPopulated = registers.length > 0;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRegisters(
      data?.filter((order) => order.production_order_status === "Pendente") ||
        [],
    );
  }, [data]);

  return (
    <div className={styles.productionOrderSectionContainer}>
      <LinkButton href="/producao" Icon={FaExternalLinkAlt} color="black">
        Lista completa
      </LinkButton>
      <ul>
        {isPendingProductionOrderPopulated ? (
          registers?.map((order) => (
            <li key={order.production_order_id}>
              <CardRegister
                register_id={order.production_order_id || ""}
                status={order.production_order_status}
                title={order.production_order_title}
                date={dataFormater(order.production_order_deadline)}
                description={order.production_order_description}
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
