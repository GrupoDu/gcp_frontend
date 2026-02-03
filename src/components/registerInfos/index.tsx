"use client";

import { useFetch } from "@/hooks/useFetch";
import styles from "./styles.module.scss";
import { Register } from "@/types/register.type";
import { LuClipboardPenLine } from "react-icons/lu";
import { useEffect } from "react";
import { dataFormater } from "@/utils/dataFormater";

const RegisterInfos = ({ register_id }: { register_id: string }) => {
  const { data, err, status } = useFetch<Register>(
    "http://localhost:8000/registers/",
    register_id,
  );

  return (
    <div className={styles.registerInfosContainer}>
      <div className={styles.registerTitle}>
        <LuClipboardPenLine color="#FFD079" className={styles.clipboardIcon} />
        <h2>{data?.title}</h2>
      </div>
      <hr />
      <span className={styles.dates}>
        prazo de entrega: {dataFormater(data?.deadline)}
      </span>
      {data?.status === "Entregue" && (
        <span className={styles.dates}>
          Entregue: {dataFormater(data!.delivered_at)}
        </span>
      )}
      <p>{data?.description ? data?.description : "Registro sem descrição"}</p>
      <h4>
        Responsável:{" "}
        {data?.employee_uuid ? data?.employee_uuid : "Ainda sem responsável."}
      </h4>
      <h4>Observação de entrega:</h4>
      <textarea name="observation" id="observation"></textarea>
    </div>
  );
};

export default RegisterInfos;
