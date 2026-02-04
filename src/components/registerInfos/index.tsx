"use client";

import { useFetch } from "@/hooks/useFetch";
import styles from "./styles.module.scss";
import { Register } from "@/types/register.type";
import { LuClipboardPenLine } from "react-icons/lu";
import { dataFormater } from "@/utils/dataFormater";
import { LuClipboardCheck, LuClipboardX } from "react-icons/lu";
import LinkButton from "../linkButton";
import { IoIosArrowBack } from "react-icons/io";
import DeliverButton from "../ui/deliverButton";
import { CiSquareCheck } from "react-icons/ci";
import { useEffect, useState } from "react";

const RegisterInfos = ({ register_id }: { register_id: string }) => {
  const [deliverObservation, setDeliverObservation] = useState<string>("");
  const { data } = useFetch<Register>(
    "http://localhost:8000/registers/",
    register_id,
  );

  const statusIcon =
    data?.status === "Entregue" ? (
      <LuClipboardCheck color="green" className={styles.clipboardIcon} />
    ) : data?.status === "Pendente" ? (
      <LuClipboardPenLine color="#FFD079" className={styles.clipboardIcon} />
    ) : (
      <LuClipboardX color="red" className={styles.clipboardIcon} />
    );

  const registerId = data?.register_id || "";

  useEffect(() => {
    console.log("deliverObservation: ", deliverObservation);
  }, [deliverObservation]);

  return (
    <>
      <div className={styles.buttons}>
        <LinkButton Icon={IoIosArrowBack} color="black" href={`/producao`}>
          Voltar
        </LinkButton>
        {data?.status === "Pendente" && (
          <DeliverButton
            register_id={registerId}
            deliver_observation={deliverObservation}
          >
            <CiSquareCheck /> Marcar como entregue
          </DeliverButton>
        )}
      </div>
      <div className={styles.registerInfosContainer}>
        <div className={styles.registerTitle}>
          {statusIcon}
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
        <p className={styles.descriptionField}>
          {data?.description ? data?.description : "Registro sem descrição"}
        </p>
        <hr />
        <h4>
          Responsável:{" "}
          {data?.employee_uuid ? data?.employee_uuid : "Ainda sem responsável."}
        </h4>
        <h4>Observação de entrega:</h4>
        {data?.status === "Entregue" ? (
          <p className={styles.observationField}>{data?.deliver_observation}</p>
        ) : data?.status === "Não entregue" ? (
          "Registro não entregue"
        ) : (
          <textarea
            name="observation"
            id="observation"
            onChange={(e) => setDeliverObservation(e.target.value)}
          />
        )}
      </div>
    </>
  );
};

export default RegisterInfos;
