"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./styles.module.scss";
import CardProductionOrder from "../ui/cardProductionOrder";
import { dataFormater } from "@/utils/dataFormater";
import { useSearchParams } from "next/navigation";
import { useProductionOrders } from "@/hooks/useProductionOrder";
import { socket } from "@/socket";
import { ProductionOrder } from "@/types/productionOrder.type";

const ProductionOrderList = () => {
  const { allProductionOrders, refetch } = useProductionOrders();
  const searchParams = useSearchParams();
  const productFilter = searchParams.get("product");
  const statusFilter = searchParams.get("status");
  const deadlineFilter = searchParams.get("deadline");
  const [filteredList, setFilteredList] = useState<
    ProductionOrder[] | undefined
  >([]);
  const employeeFilter = searchParams.get("employee");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFilteredList(
      allProductionOrders?.filter(
        (order) =>
          (productFilter ? order.product_uuid === productFilter : true) &&
          (statusFilter
            ? order.production_order_status === statusFilter
            : true) &&
          (deadlineFilter
            ? order.production_order_deadline === deadlineFilter
            : true) &&
          (employeeFilter ? order.employee_uuid === employeeFilter : true),
      ),
    );
  }, [allProductionOrders, productFilter, statusFilter, deadlineFilter]);

  useEffect(() => {
    socket.on("productionOrderNotify", (data) => {
      setFilteredList((prev) => [...(prev || []), data]);
    });

    return () => {
      socket.off("productionOrderNotify");
    };
  });

  return (
    <ul className={styles.cardListContainer}>
      {filteredList?.map((order) => (
        <li key={order.production_order_id}>
          <CardProductionOrder
            date={dataFormater(order.production_order_deadline)}
            description={order.production_order_description}
            title={order.production_order_title}
            status={order.production_order_status}
            register_id={order?.production_order_id || ""}
            refetch={refetch}
          />
        </li>
      ))}
    </ul>
  );
};

export default ProductionOrderList;
