"use client";

import styles from "./styles.module.scss";
import FiltersList from "../filtersList";
import DeadlineInput from "../ui/deadlineInput";
import ProductsDropdown from "../ui/productsDropdown";
import StatusDropdown from "../ui/statusDropdown";
import ListFooter from "../listFooter";
import React, { Suspense, useEffect, useRef, useState } from "react";
import ProductionOrderList from "../cardLists/productionOrderList";
import { ProductionOrderProvider } from "@/providers/productionOrder.provider";
import FilterMobileContainer from "../filterMobileContainer";
import { useLoading } from "@/hooks/useLoading";
import Loading from "../ui/loading";
import WeldersActivitiesList from "@/components/lists/weldersActivitiesList";
import { LuClipboardList } from "react-icons/lu";
import { RiFileList3Line } from "react-icons/ri";
import AssistantsActivitiesList from "@/components/lists/assistantsActivitiesList";
import OpenMobileProvider from "@/providers/openMobile.provider";
import { useRouter, useSearchParams } from "next/navigation";
import { handleFilterChange } from "@/utils/handleFilterChange";
import SearchBar from "@/components/searchBar";

const RegisterListContainer = () => {
  const [elementIndex, setElementIndex] = useState(0);
  const { isLoading } = useLoading();
  const lists = [
    <ProductionOrderList key={0} />,
    <WeldersActivitiesList key={1} />,
    <AssistantsActivitiesList key={2} />,
  ];
  const buttonRegister = elementIndex ? "Registrar Atividade" : "Nova Ordem de produção";
  const displayStatusFilter = elementIndex === 0 && <StatusDropdown />;
  const displayDeadline = elementIndex === 0 && <DeadlineInput />;
  const displayProductDropdown = elementIndex !== 2 && <ProductsDropdown />;
  const displayActivityDropdown = elementIndex === 2 && <ActivityDropdown />;
  const isWelderList = elementIndex === 1;
  const isAssistantsList = elementIndex === 2;
  const buttonlink = (): string => {
    if (!isWelderList && !isAssistantsList) {
      return "#";
    } else if (isWelderList) {
      return "/producao/atividade?employee=soldador";
    } else {
      return "/producao/atividade?employee=assistente";
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <OpenMobileProvider>
        <ProductionOrderProvider>
          <main style={{ gap: 0 }} className={`${styles.listContainer} mainContainer`}>
            <Tabs elementIndex={elementIndex} setElementIndex={setElementIndex} />
            <FiltersList
              buttonLabel={buttonRegister}
              hrefButton={buttonlink()}
              style={{ borderRadius: 0, borderBottom: 0 }}
            >
              <DeadlineInput />
              {displayProductDropdown}
              {displayActivityDropdown}
              <SearchBar targetFilter={"employee"} />
              {displayStatusFilter}
            </FiltersList>
            <FilterMobileContainer>
              {displayDeadline}
              {displayProductDropdown}
              {displayActivityDropdown}
              <SearchBar targetFilter={"employee"} />
              {displayStatusFilter}
            </FilterMobileContainer>
            <Suspense fallback={<Loading />}>
              <div className="tableWrapper">{lists[Number(elementIndex)]}</div>
            </Suspense>
            <ListFooter status={["Pendente", "Entregue", "Não entregue"]} />
          </main>
        </ProductionOrderProvider>
      </OpenMobileProvider>
    </>
  );
};

interface TabsProps {
  elementIndex: number;
  setElementIndex: (value: number) => void;
}

function Tabs(props: TabsProps) {
  const { setElementIndex, elementIndex } = props;
  const isElementSelected = (index: number) => elementIndex === index;
  const router = useRouter();
  const tableSize = useRef(700);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    const tableWrapper = document.getElementsByClassName("tableWrapper")[0];

    if (tableWrapper) {
      // 220 porque sim
      tableSize.current = tableWrapper.clientHeight - 220;
      console.log("Tamanho da tabela: ", tableSize.current);
    }
  }, [trigger]);

  const handleClickTabChange = (index: number) => {
    const calculatePerPage = Math.floor(tableSize.current / 30);
    console.log(calculatePerPage);
    setElementIndex(index);
    setTrigger((prev) => prev + 1);
    router.push(`/producao?page=1&per_page=${calculatePerPage}`);
  };

  return (
    <div className={styles.tabs}>
      <button
        className={`${isElementSelected(0) && styles.isSelected}`}
        disabled={isElementSelected(0)}
        onClick={() => handleClickTabChange(0)}
      >
        <RiFileList3Line className={styles.icons} />
        <span>Ordens de produção</span>
      </button>
      <button
        className={`${isElementSelected(1) && styles.isSelected}`}
        disabled={isElementSelected(1)}
        onClick={() => handleClickTabChange(1)}
      >
        <LuClipboardList className={styles.icons} />
        <span>Atividade de soldadores</span>
      </button>
      <button
        className={`${isElementSelected(2) && styles.isSelected}`}
        disabled={isElementSelected(2)}
        onClick={() => handleClickTabChange(2)}
      >
        <LuClipboardList className={styles.icons} />
        <span>Atividade de Assistentes</span>
      </button>
    </div>
  );
}

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
