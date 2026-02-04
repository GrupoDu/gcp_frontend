"use client";

import styles from "./styles.module.scss";
import FiltersList from "../filtersList";
import DeadlineInput from "../ui/deadlineInput";
import ProductsDropdown from "../ui/productsDropdown";
import { ProductProvider } from "@/app/providers/productsProvider";
import EmployeeDropdown from "../employeeDropdown";
import StatusDropdown from "../ui/statusDropdown";
import RegisterList from "../cardLists/registerList";
import ListFooter from "../listFooter";
import { RegisterProvider } from "@/context/registerContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { EmployeeProvider } from "@/app/providers/employee.provider";

const ListContainer = () => {
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
    <RegisterProvider>
      <div className={styles.listContainer}>
        <FiltersList>
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
        <RegisterList />
        <ListFooter status={["Pendente", "Entregue", "Não entregue"]} />
      </div>
    </RegisterProvider>
  );
};

export default ListContainer;
