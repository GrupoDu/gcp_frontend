"use client";

import styles from "./styles.module.scss";
import Loading from "@/components/ui/loading";
import OpenMobileProvider from "@/providers/openMobile.provider";
import ListFooter from "@/components/listFooter";
import FilterMobileContainer from "@/components/filterMobileContainer";
import StatusDropdown from "@/components/ui/statusDropdown";
import ProductsDropdown from "@/components/ui/productsDropdown";
import DeadlineInput from "@/components/ui/deadlineInput";
import FiltersList from "@/components/filtersList";
import { useLoading } from "@/hooks/useLoading";
import DataNotFound from "@/components/dataNotFound";
import { useFetch } from "@/hooks/useFetch";
import { ProductionOrder } from "@/types/productionOrder.interface";
import { useSearchParams } from "next/navigation";
import CardProductionOrder from "@/components/ui/cardProductionOrder";
import { dataFormater } from "@/utils/dataFormater";
import { titleFormatter } from "@/utils/titleFormatter";

const ProductionContainer = () => {
  const { isLoading } = useLoading();
  const { data: productionOrders, refetch } = useFetch<ProductionOrder[]>("productionOrder");
  const searchParams = useSearchParams();
  const productFilter = searchParams.get("product");
  const statusFilter = searchParams.get("status");
  const deadlineFilter = searchParams.get("deadline");
  const employeeFilter = searchParams.get("employee");
  const isListEmpty = !productionOrders || productionOrders.length < 1;

  return (
    <>
      {isLoading && <Loading />}
      <OpenMobileProvider>
        <main style={{ gap: 0 }} className={`${styles.listContainer} mainContainer ${isLoading ? "loading" : ""}`}>
          <FiltersList
            buttonLabel={"Ordem de produção"}
            hrefButton={"producao/atividade"}
            style={{ borderRadius: ".2rem .2rem 0 0", borderBottom: 0 }}
          >
            <DeadlineInput />
            <ProductsDropdown />
            <StatusDropdown />
          </FiltersList>
          <FilterMobileContainer>
            <DeadlineInput />
            <ProductsDropdown />
            <StatusDropdown />
          </FilterMobileContainer>
          <ul className={`${styles.cardListContainer} ${isListEmpty && styles.emptyList}`}>
            {isListEmpty && <DataNotFound />}
            {productionOrders &&
              productionOrders.map((order) => (
                <li key={order.productionOrderUuid}>
                  <CardProductionOrder
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
        </main>
      </OpenMobileProvider>
    </>
  );
};

export default ProductionContainer;
