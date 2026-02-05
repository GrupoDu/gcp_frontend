"use client";

import CardRegister from "../ui/cardRegister";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { dataFormater } from "@/utils/dataFormater";
import { useRegisters } from "@/hooks/useRegisters";
import { useSearchParams } from "next/navigation";
import { Register } from "@/types/register.type";

const RegisterList = () => {
  const { registersData, err, status, refetch } = useRegisters();
  const searchParams = useSearchParams();
  const [filteredRegisters, setFilteredRegisters] = useState<Register[]>();
  const [isListPopulated, setIsListPopulated] = useState(false);

  useEffect(() => {
    const productFilter = searchParams.get("produto");
    const employeeFilter = searchParams.get("funcionario");
    const deadlineFilter = searchParams.get("prazo");
    const statusFilter = searchParams.get("estado");

    setFilteredRegisters(
      registersData?.filter((item) => {
        console.log(item.deadline);
        return (
          (productFilter ? item.product_uuid === productFilter : true) &&
          (employeeFilter ? item.employee_uuid === employeeFilter : true) &&
          (deadlineFilter ? item.deadline.includes(deadlineFilter) : true) &&
          (statusFilter ? item.status === statusFilter : true)
        );
      }),
    );

    if (registersData && registersData.length > 0) setIsListPopulated(true);

    console.log(deadlineFilter);
  }, [registersData, searchParams]);

  useEffect(() => {
    console.log("status: ", status);
    console.log("data: ", registersData);
    console.log("err: ", err);

    if (registersData) {
    }
  }, [registersData, status, err]);

  return (
    <ul
      className={styles.ul}
      style={
        isListPopulated
          ? { display: "grid" }
          : { display: "flex", justifyContent: "center", alignItems: "center" }
      }
    >
      {isListPopulated ? (
        filteredRegisters?.map((item) => (
          <li key={item.register_id}>
            <CardRegister
              refetch={refetch}
              status={item.status}
              title={item.title}
              date={dataFormater(item.deadline)}
              description={item.description}
              register_id={item.register_id}
            />
          </li>
        ))
      ) : (
        <h1>Não há registros</h1>
      )}
    </ul>
  );
};

export default RegisterList;
