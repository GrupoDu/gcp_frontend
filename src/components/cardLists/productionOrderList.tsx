"use client";

import styles from "./styles.module.scss";
import CardProductionOrder from "../ui/cardProductionOrder";
import { dataFormater } from "@/utils/dataFormater";
import { useSearchParams } from "next/navigation";
import { ProductionOrder } from "@/types/productionOrder.type";
import { useFetch } from "@/hooks/useFetch";

const ProductionOrderList = () => {
  const { data: productionOrders, refetch } = useFetch<ProductionOrder[]>("production-orders");
  const searchParams = useSearchParams();
  const productFilter = searchParams.get("product");
  const statusFilter = searchParams.get("status");
  const deadlineFilter = searchParams.get("deadline");
  const employeeFilter = searchParams.get("employee");
  // const [filteredList, setFilteredList] = useState<ProductionOrder[] | undefined>([]);
  const filteredList = productionOrders?.filter(
    (order) =>
      order.products.name === productFilter &&
      order.production_order_status === statusFilter &&
      order.production_order_deadline.toISOString() === deadlineFilter &&
      order.welders?.employee_uuid === employeeFilter,
  );
  const title = (production_order: ProductionOrder) =>
    `${production_order.quantity_to_produce} ${production_order.products.acronym}`;

  // useEffect(() => {
  //   setFilteredList(
  //     productionOrders?.filter(
  //       (order) =>
  //         (productFilter ? order.products.product_uuid === productFilter : true) &&
  //         (statusFilter ? order.production_order_status === statusFilter : true) &&
  //         (deadlineFilter ? order.production_order_deadline.toISOString() === deadlineFilter : true) &&
  //         (employeeFilter ? order.welders?.employee_uuid === employeeFilter : true),
  //     ),
  //   );
  // }, [productionOrders, productFilter, statusFilter, deadlineFilter, employeeFilter]);

  return (
    <ul className={styles.cardListContainer}>
      {filteredList?.map((order) => (
        <li key={order.production_order_uuid}>
          <CardProductionOrder
            date={dataFormater(order.production_order_deadline)}
            description={order.production_order_description || ""}
            title={title(order)}
            status={order.production_order_status}
            register_id={order?.production_order_uuid || ""}
            refetch={refetch}
          />
        </li>
      ))}
    </ul>
  );
};

export default ProductionOrderList;
