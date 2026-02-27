"use client";

import styles from "./styles.module.scss";
import FiltersList from "../filtersList";
import DeadlineInput from "../ui/deadlineInput";
import ProductsDropdown from "../ui/productsDropdown";
import { ProductProvider } from "@/providers/products.provider";
import EmployeeDropdown from "../employeeDropdown";
import StatusDropdown from "../ui/statusDropdown";
import ListFooter from "../listFooter";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { EmployeeProvider } from "@/providers/employee.provider";
import ProductionOrderList from "../cardLists/productionOrderList";
import { ProductionOrderProvider } from "@/providers/productionOrder.provider";
import { IoFilter } from "react-icons/io5";
import FilterMobileContainer from "../filterMobileContainer";

const RegisterListContainer = () => {
  const [productValue, setProductValue] = useState("");
  const [statusValue, setStatusValue] = useState("");
  const [employeeValue, setEmployeeValue] = useState("");
  const [deadlineValue, setDeadlineValue] = useState("");
  const [openFilterContainer, setOpenFilterContainer] = useState(false);

  const router = useRouter();

  useEffect(() => {
    router.push(
      `/producao?product=${productValue}&status=${statusValue}&employee=${employeeValue}&deadline=${deadlineValue}`,
    );
  }, [productValue, statusValue, employeeValue, deadlineValue, router]);

  return (
    <ProductionOrderProvider>
      <div className={styles.listContainer}>
        <FiltersList
          openFilterContainer={openFilterContainer}
          openMobileFilters={setOpenFilterContainer}
          buttonLabel="Nova ordem de produção"
          hrefButton="/producao/register"
        >
          <DeadlineInput
            deadlineValue={deadlineValue}
            setDeadlineValue={setDeadlineValue}
          />
          <ProductProvider>
            <ProductsDropdown
              productValue={productValue}
              setProductValue={setProductValue}
            />
          </ProductProvider>
          <EmployeeProvider>
            <EmployeeDropdown
              employeeValue={employeeValue}
              setEmployeeValue={setEmployeeValue}
            />
          </EmployeeProvider>
          <StatusDropdown
            statusValue={statusValue}
            setStatusValue={setStatusValue}
          />
        </FiltersList>
        <FilterMobileContainer isFilterContainerOpen={openFilterContainer}>
          <DeadlineInput
            deadlineValue={deadlineValue}
            setDeadlineValue={setDeadlineValue}
          />
          <ProductProvider>
            <ProductsDropdown
              productValue={productValue}
              setProductValue={setProductValue}
            />
          </ProductProvider>
          <EmployeeProvider>
            <EmployeeDropdown
              employeeValue={employeeValue}
              setEmployeeValue={setEmployeeValue}
            />
          </EmployeeProvider>
          <StatusDropdown
            statusValue={statusValue}
            setStatusValue={setStatusValue}
          />
        </FilterMobileContainer>
        <ProductionOrderList />
        <ListFooter status={["Pendente", "Entregue", "Não entregue"]} />
      </div>
    </ProductionOrderProvider>
  );
};

export default RegisterListContainer;
