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

const RegisterListContainer = () => {
  const [productValue, setProductValue] = useState("");
  const [statusValue, setStatusValue] = useState("");
  const [employeeValue, setEmployeeValue] = useState("");
  const [deadlineValue, setDeadlineValue] = useState("");
  const router = useRouter();

  useEffect(() => {
    const filterParams = new URLSearchParams();

    filterParams.set("produto", productValue);
    filterParams.set("estado", statusValue);
    filterParams.set("prazo", deadlineValue);
    filterParams.set("funcionario", employeeValue);

    console.log(productValue, statusValue, deadlineValue, employeeValue);

    return router.push(`/producao?${filterParams.toString()}`);
  }, [deadlineValue, router, productValue, statusValue, employeeValue]);

  return (
    <ProductionOrderProvider>
      <div className={styles.listContainer}>
        <FiltersList
          buttonLabel="Adicionar registro"
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
        <ProductionOrderList />
        <ListFooter status={["Pendente", "Entregue", "Não entregue"]} />
      </div>
    </ProductionOrderProvider>
  );
};

export default RegisterListContainer;
