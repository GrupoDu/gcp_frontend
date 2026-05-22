"use client";

import styles from "./styles.module.scss";
import FiltersList from "../filtersList";
import DeadlineInput from "../ui/deadlineInput";
import ProductsDropdown from "../ui/productsDropdown";
import EmployeeDropdown from "../employeeDropdown";
import StatusDropdown from "../ui/statusDropdown";
import ListFooter from "../listFooter";
import { Suspense, useState } from "react";
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

const RegisterListContainer = () => {
  const [elementIndex, setElementIndex] = useState(0);
  const { isLoading } = useLoading();
  const lists = [
    <ProductionOrderList key={0} />,
    <WeldersActivitiesList key={1} />,
    <AssistantsActivitiesList key={2} />,
  ];
  const buttonRegister = elementIndex ? "Registrar Atividade" : "Nova Ordem de produção";
  const registerLink = elementIndex ? "/producao/activity" : "#";
  const displayStatusFilter = elementIndex === 0 && <StatusDropdown />;
  const displayDeadline = elementIndex === 0 && <DeadlineInput />;

  return (
    <>
      {/*{isLoading && <Loading />}*/}
      <OpenMobileProvider>
        <ProductionOrderProvider>
          <main style={{ gap: 0 }} className={`${styles.listContainer} mainContainer`}>
            <Tabs elementIndex={elementIndex} setElementIndex={setElementIndex} />
            <FiltersList
              buttonLabel={buttonRegister}
              hrefButton={registerLink}
              style={{ borderRadius: 0, borderBottom: 0 }}
            >
              {displayDeadline}
              <ProductsDropdown />
              <EmployeeDropdown />
              {displayStatusFilter}
            </FiltersList>
            <FilterMobileContainer>
              {displayDeadline}
              <ProductsDropdown />
              <EmployeeDropdown />
              {displayStatusFilter}
            </FilterMobileContainer>
            <Suspense fallback={<Loading />}>{lists[Number(elementIndex)]}</Suspense>
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

  return (
    <div className={styles.tabs}>
      <button
        className={`${isElementSelected(0) && styles.isSelected}`}
        disabled={isElementSelected(0)}
        onClick={() => setElementIndex(0)}
      >
        <RiFileList3Line className={styles.icons} />
        <span>Ordens de produção</span>
      </button>
      <button
        className={`${isElementSelected(1) && styles.isSelected}`}
        disabled={isElementSelected(1)}
        onClick={() => setElementIndex(1)}
      >
        <LuClipboardList className={styles.icons} />
        <span>Atividade de soldadores</span>
      </button>
      <button
        className={`${isElementSelected(2) && styles.isSelected}`}
        disabled={isElementSelected(2)}
        onClick={() => setElementIndex(2)}
      >
        <LuClipboardList className={styles.icons} />
        <span>Atividade de Assistentes</span>
      </button>
    </div>
  );
}

export default RegisterListContainer;
