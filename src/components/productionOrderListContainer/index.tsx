"use client";

import styles from "./styles.module.scss";
import FiltersList from "../filtersList";
import DeadlineInput from "../ui/deadlineInput";
import ProductsDropdown from "../ui/productsDropdown";
import StatusDropdown from "../ui/statusDropdown";
import ListFooter from "../listFooter";
import React, { useRef, useState } from "react";
import ProductionOrderList from "../cardLists/productionOrderList";
import { ProductionOrderProvider } from "@/providers/productionOrder.provider";
import FilterMobileContainer from "../filterMobileContainer";
import { useLoading } from "@/hooks/useLoading";
import Loading from "../ui/loading";
import OpenMobileProvider from "@/providers/openMobile.provider";
import { useRouter, useSearchParams } from "next/navigation";
import { handleFilterChange } from "@/utils/handleFilterChange";
import SearchBar from "@/components/searchBar";

const RegisterListContainer = () => {
  const { isLoading } = useLoading();

  return (
    <>
      {isLoading && <Loading />}
      <OpenMobileProvider>
        <main style={{ gap: 0 }} className={`${styles.listContainer} mainContainer`}>
          <FiltersList
            buttonLabel={"Ordem de produção"}
            hrefButton={"producao/atividade"}
            style={{ borderRadius: ".4rem .4rem 0 0", borderBottom: 0 }}
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
          <ProductionOrderList />
          <ListFooter status={["Em Produção", "Entregue", "Não entregue"]} />
        </main>
      </OpenMobileProvider>
    </>
  );
};

function ActivityDropdown() {
  const activityRef = useRef("");
  const [activity, setActivity] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const activities = [
    { value: "Corte", label: "Corte" },
    { value: "Pintura", label: "Pintura" },
    { value: "Dobra", label: "Dobra" },
    { value: "Acabamento", label: "Acabamento" },
  ];

  return (
    <>
      <label className={styles.activityDropdown}>
        <span>Atividade</span>
        <select
          name="activityDropdown"
          value={activity}
          onChange={(e) =>
            handleFilterChange(router, setActivity, searchParams, activityRef, e.target.value, "activity")
          }
        >
          <option value="">Tipo de atividade</option>
          {activities.map((activity, index) => (
            <option key={index} value={activity.value}>
              {activity.label}
            </option>
          ))}
        </select>
      </label>
    </>
  );
}

export default RegisterListContainer;
