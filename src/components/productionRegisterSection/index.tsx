"use client";

import styles from "./styles.module.scss";
import LinkButton from "../linkButton";
import { FaExternalLinkAlt } from "react-icons/fa";
import CardRegister from "../ui/cardRegister";
import { useFetch } from "@/hooks/useFetch";
import { Register } from "@/types/register.type";
import { dataFormater } from "@/utils/dataFormater";
import { useEffect, useState } from "react";

const ProductionRegisterSection = () => {
  const { data } = useFetch<Register>("http://localhost:8000/registers");
  const [registers, setRegisters] = useState<Register[]>([]);
  const [isPendingRegistersPopulated, setIsPendingRegistersPopulated] =
    useState(false);

  const pendingRegisters =
    data?.registers!.filter((register) => register.status === "Pendente") || [];

  useEffect(() => {
    setRegisters(pendingRegisters);

    if (pendingRegisters.length > 0) {
      setIsPendingRegistersPopulated(false);
    }
  }, [data]);

  return (
    <div className={styles.productionRegisterSectionContainer}>
      <LinkButton
        href="/pendingRegisters"
        Icon={FaExternalLinkAlt}
        color="black"
      >
        Lista completa
      </LinkButton>
      <ul>
        {isPendingRegistersPopulated ? (
          pendingRegisters?.map((register) => (
            <li key={register.register_id}>
              <CardRegister
                register_id={register.register_id}
                status={register.status}
                title={register.title}
                date={dataFormater(register.deadline)}
                description={register.description}
              />
            </li>
          ))
        ) : (
          <h3>Nenhum registro pendente</h3>
        )}
      </ul>
    </div>
  );
};

export default ProductionRegisterSection;
