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
import { useState } from "react";
import { useRegisterEmployees } from "@/hooks/useRegisterEmployees";

const RegisterInfos = ({ register_id }: { register_id: string }) => {
  const [deliverObservation, setDeliverObservation] = useState<string>("");
  const { data: registerData } = useFetch<Register>(
    "http://localhost:8000/registers/",
    register_id,
  );
  const employees = useRegisterEmployees();

  const statusIcon =
    registerData?.status === "Entregue" ? (
      <LuClipboardCheck color="green" className={styles.clipboardIcon} />
    ) : registerData?.status === "Pendente" ? (
      <LuClipboardPenLine color="#FFD079" className={styles.clipboardIcon} />
    ) : (
      <LuClipboardX color="red" className={styles.clipboardIcon} />
    );

  const registerId = registerData?.register_id || "";

  return (
    <>
      <div className={styles.buttons}>
        <LinkButton Icon={IoIosArrowBack} color="black" href={`/producao`}>
          Voltar
        </LinkButton>
        {registerData?.status === "Pendente" && (
          <DeliverButton
            bodyValues={{
              deliver_observation: deliverObservation,
              status: "Entregue",
              delivered_at: new Date().toISOString(),
            }}
            endpoint={`registers/${registerId}`}
            redirectHref="/producao"
          >
            <CiSquareCheck /> Marcar como entregue
          </DeliverButton>
        )}
      </div>
      <div className={styles.registerInfosContainer}>
        <div className={styles.registerTitle}>
          {statusIcon}
          <h2>{registerData?.title}</h2>
        </div>
        <hr />
        <span className={styles.dates}>
          prazo de entrega:{" "}
          {dataFormater(registerData?.deadline.toString() || "")}
        </span>
        {registerData?.status === "Entregue" && (
          <span className={styles.dates}>
            Entregue: {dataFormater(registerData?.delivered_at || "")}
          </span>
        )}
        <p className={styles.descriptionField}>
          {registerData?.description
            ? registerData?.description
            : "Registro sem descrição"}
        </p>
        <hr />
        <h4>
          Soldador:{" "}
          {registerData?.employee_uuid
            ? employees.welder?.name
            : "Ainda sem soldador."}
        </h4>
        <h4>Ajudantes:</h4>
        <ul>
          <div className={styles.assistantList}>
            <li
              className={`${styles.assistant} ${!registerData?.cut_assistant && styles.undefinedAssistant}`}
            >
              <b>Corte:</b>{" "}
              {registerData?.cut_assistant
                ? employees.cutAssistant?.name
                : "Não definido."}
            </li>
            <li
              className={`${styles.assistant} ${!registerData?.fold_assistant && styles.undefinedAssistant}`}
            >
              <b>Dobra:</b>{" "}
              {registerData?.fold_assistant
                ? employees.foldAssistant?.name
                : "Não definido."}
            </li>
            <li
              className={`${styles.assistant} ${!registerData?.finishing_assistant && styles.undefinedAssistant}`}
            >
              <b>Finalização:</b>{" "}
              {registerData?.finishing_assistant
                ? employees.finishingAssistant?.name
                : "Não definido."}
            </li>
            <li
              className={`${styles.assistant} ${!registerData?.paint_assistant && styles.undefinedAssistant}`}
            >
              <b>Pintura:</b>{" "}
              {registerData?.paint_assistant
                ? employees.paintAssistant?.name
                : "Não definido."}
            </li>
          </div>
        </ul>
        <h4>Observação de entrega:</h4>
        {registerData?.status === "Entregue" ? (
          <p className={styles.observationField}>
            {registerData?.deliver_observation}
          </p>
        ) : registerData?.status === "Não entregue" ? (
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
