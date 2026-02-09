"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Register } from "@/types/register.type";
import CardRegister from "../ui/cardRegister";
import { dataFormater } from "@/utils/dataFormater";
import { useSearchParams } from "next/navigation";
import { useRegisters } from "@/hooks/useRegisters";

const RegisterList = () => {
  const { registersData } = useRegisters();
  const [filteredList, setFilteredList] = useState<Register[] | undefined>([]);
  const searchParams = useSearchParams();
  const productFilter = searchParams.get("produto");
  const statusFilter = searchParams.get("estado");
  const deadlineFilter = searchParams.get("prazo");
  const employeeFilter = searchParams.get("funcionario");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFilteredList(
      registersData?.filter(
        (register) =>
          (productFilter ? register.product_uuid === productFilter : true) &&
          (statusFilter ? register.status === statusFilter : true) &&
          (deadlineFilter ? register.deadline === deadlineFilter : true) &&
          (employeeFilter ? register.employee_uuid === employeeFilter : true),
      ),
    );
  }, [
    registersData,
    productFilter,
    statusFilter,
    deadlineFilter,
    employeeFilter,
  ]);

  return (
    <ul className={styles.cardListContainer}>
      {filteredList?.map((register) => (
        <li key={register.register_id}>
          <CardRegister
            date={dataFormater(register.deadline)}
            description={register.description}
            title={register.title}
            status={register.status}
            register_id={register.register_id}
          />
        </li>
      ))}
    </ul>
  );
};

export default RegisterList;
