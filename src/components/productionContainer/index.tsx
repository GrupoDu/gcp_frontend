"use client";

import styles from "./styles.module.scss";
import Loading from "@/components/ui/loading";
import OpenMobileProvider from "@/providers/openMobile.provider";
import ListFooter from "@/components/listFooter";
import StatusDropdown from "@/components/ui/statusDropdown";
import ProductsDropdown from "@/components/ui/productsDropdown";
import FiltersList from "@/components/filtersList";
import { useLoading } from "@/hooks/useLoading";
import DataNotFound from "@/components/dataNotFound";
import { useFetch } from "@/hooks/useFetch";
import { ProductionOrder } from "@/types/productionOrder.interface";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CardProductionOrder from "@/components/ui/cardProductionOrder";
import { dataFormater } from "@/utils/dataFormater";
import { titleFormatter } from "@/utils/titleFormatter";
import SelectInput from "@/components/ui/selectInput";
import { MONTHS_OPTIONS } from "@/constants/monthsOptions.constant";
import { TRACK_PARAMS } from "@/constants/trackParams.constant";
import { useState } from "react";
import { setQueryParams } from "@/utils/setQueryParams";

const ProductionContainer = () => {
  const { isLoading } = useLoading();
  const [monthFilter, setMonthFilter] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasFilters = searchParams.size > 0;
  const endpoint = `productionOrder${hasFilters ? "/filter" : ""}`;
  const { data: productionOrders, refetch } = useFetch<ProductionOrder[]>(endpoint, TRACK_PARAMS);
  const isListEmpty = !productionOrders || productionOrders.length < 1;

  const handleMonthChange = (value: string) => {
    setMonthFilter(value);
    const params = setQueryParams({
      searchParams,
      value,
      key: "month",
    });
    router.push(`${pathname}?${params}`);
  };

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
            <SelectInput
              label={"Mês"}
              options={MONTHS_OPTIONS}
              defaultValue={"Filtrar por Mês"}
              onChange={(e) => handleMonthChange(e.target.value)}
              value={monthFilter}
            />
            <ProductsDropdown />
            <StatusDropdown />
          </FiltersList>
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
