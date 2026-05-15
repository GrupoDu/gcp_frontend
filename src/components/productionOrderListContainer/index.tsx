"use client";

import styles from "./styles.module.scss";
import FiltersList from "../filtersList";
import DeadlineInput from "../ui/deadlineInput";
import ProductsDropdown from "../ui/productsDropdown";
import { ProductProvider } from "@/providers/products.provider";
import EmployeeDropdown from "../employeeDropdown";
import StatusDropdown from "../ui/statusDropdown";
import ListFooter from "../listFooter";
import { Dispatch, SetStateAction, Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { EmployeeProvider } from "@/providers/employee.provider";
import ProductionOrderList from "../cardLists/productionOrderList";
import { ProductionOrderProvider } from "@/providers/productionOrder.provider";
import FilterMobileContainer from "../filterMobileContainer";
import { useLoading } from "@/hooks/useLoading";
import Loading from "../ui/loading";
import WeldersActivitiesList from "@/components/lists/weldersActivitiesList";
import { WeldersActivitiesProvider } from "@/providers/weldersActivities.provider";
import { RiFileList3Line } from "react-icons/ri";
import { RxActivityLog } from "react-icons/rx";

const RegisterListContainer = () => {
  const [productValue, setProductValue] = useState("");
  const [statusValue, setStatusValue] = useState("");
  const [employeeValue, setEmployeeValue] = useState("");
  const [elementIndex, setElementIndex] = useState(false);
  const [deadlineValue, setDeadlineValue] = useState("");
  const [openFilterContainer, setOpenFilterContainer] = useState(false);
  const { isLoading } = useLoading();
  const lists = [<ProductionOrderList key={0} />, <WeldersActivitiesList key={1} />];
  const buttonRegister = elementIndex ? "Registrar Atividade" : "Nova Ordem de produção";
  const registerLink = elementIndex ? "/producao/activity" : "#";
  const displayStatusFilter = !elementIndex && (
    <StatusDropdown statusValue={statusValue} setStatusValue={setStatusValue} />
  );
  const displayDeadline = !elementIndex && (
    <DeadlineInput deadlineValue={deadlineValue} setDeadlineValue={setDeadlineValue} />
  );

  const router = useRouter();

  useEffect(() => {
    router.push(
      `/producao?product=${productValue}&status=${statusValue}&employee=${employeeValue}&deadline=${deadlineValue}`,
    );
  }, [productValue, statusValue, employeeValue, deadlineValue, router]);

  return (
    <>
      {isLoading && <Loading />}
      <WeldersActivitiesProvider>
        <ProductProvider>
          <ProductionOrderProvider>
            <main style={{ gap: 0 }} className={`${styles.listContainer} mainContainer ${isLoading && "loading"}`}>
              <Tabs elementIndex={elementIndex} setElementIndex={setElementIndex} />
              <FiltersList
                openFilterContainer={openFilterContainer}
                openMobileFilters={setOpenFilterContainer}
                buttonLabel={buttonRegister}
                hrefButton={registerLink}
                style={{ borderRadius: 0, borderBottom: 0 }}
              >
                {displayDeadline}
                <ProductProvider>
                  <ProductsDropdown productValue={productValue} setProductValue={setProductValue} />
                </ProductProvider>
                <EmployeeProvider>
                  <EmployeeDropdown employeeValue={employeeValue} setEmployeeValue={setEmployeeValue} />
                </EmployeeProvider>
                {displayStatusFilter}
              </FiltersList>
              <FilterMobileContainer isFilterContainerOpen={openFilterContainer}>
                {displayDeadline}
                <ProductProvider>
                  <ProductsDropdown productValue={productValue} setProductValue={setProductValue} />
                </ProductProvider>
                <EmployeeProvider>
                  <EmployeeDropdown employeeValue={employeeValue} setEmployeeValue={setEmployeeValue} />
                </EmployeeProvider>
                {displayStatusFilter}
              </FilterMobileContainer>
              <Suspense fallback={<Loading />}>{lists[Number(elementIndex)]}</Suspense>
              <ListFooter status={["Pendente", "Entregue", "Não entregue"]} />
            </main>
          </ProductionOrderProvider>
        </ProductProvider>
      </WeldersActivitiesProvider>
    </>
  );
};

interface TabsProps {
  elementIndex: boolean;
  setElementIndex: Dispatch<SetStateAction<boolean>>;
}

function Tabs(props: TabsProps) {
  const { setElementIndex, elementIndex } = props;

  const isActivityTabSelected = Number(elementIndex) === 0;
  const changeTab = () => setElementIndex((prevState: boolean) => !prevState);

  return (
    <div className={styles.tabs}>
      <button
        className={`${isActivityTabSelected && styles.isSelected}`}
        disabled={isActivityTabSelected}
        onClick={changeTab}
      >
        <RiFileList3Line className={styles.icons} />
        <span>Ordens de produção</span>
      </button>
      <button
        className={`${!isActivityTabSelected && styles.isSelected}`}
        disabled={!isActivityTabSelected}
        onClick={changeTab}
      >
        <RxActivityLog className={styles.icons} />
        <span>Atividade de soldadores</span>
      </button>
    </div>
  );
}

export default RegisterListContainer;
