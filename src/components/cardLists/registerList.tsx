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
    <ul className={styles.ul}>
      {filteredRegisters?.map((item) => (
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
      ))}
    </ul>
  );
};

export default RegisterList;
