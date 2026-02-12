"use client";

import { useFetch } from "@/hooks/useFetch";
import styles from "./styles.module.scss";
import { ProductionOrder } from "@/types/productionOrder.type";
import { LuClipboardPenLine } from "react-icons/lu";
import { dataFormater } from "@/utils/dataFormater";
import { LuClipboardCheck, LuClipboardX } from "react-icons/lu";
import LinkButton from "../linkButton";
import { IoIosArrowBack } from "react-icons/io";
import DeliverButton from "../ui/deliverButton";
import { CiSquareCheck } from "react-icons/ci";
import { useState } from "react";
import { useRegisterEmployees } from "@/hooks/useProductionOrderEmployees";

const ProductionOrderInfos = ({
  production_order_id,
}: {
  production_order_id: string;
}) => {
  const [deliverObservation, setDeliverObservation] = useState<string>("");
  const { data: allProductionOrders } = useFetch<ProductionOrder>(
    "http://localhost:8000/productionOrder/",
    production_order_id,
  );
  const employees = useRegisterEmployees();

  const statusIcon =
    allProductionOrders?.production_order_status === "Entregue" ? (
      <LuClipboardCheck color="green" className={styles.clipboardIcon} />
    ) : allProductionOrders?.production_order_status === "Pendente" ? (
      <LuClipboardPenLine color="#FFD079" className={styles.clipboardIcon} />
    ) : (
      <LuClipboardX color="red" className={styles.clipboardIcon} />
    );

  const registerId = allProductionOrders?.production_order_id || "";

  return (
    <>
      <div className={styles.buttons}>
        <LinkButton Icon={IoIosArrowBack} color="black" href={`/producao`}>
          Voltar
        </LinkButton>
        {allProductionOrders?.production_order_status === "Pendente" && (
          <DeliverButton
            bodyValues={{
              deliver_observation: deliverObservation,
              production_order_status: "Entregue",
              delivered_at: new Date().toISOString(),
            }}
            endpoint={`registers/${registerId}`}
            redirectHref="/producao"
            employeeUuid={allProductionOrders?.employee_uuid || ""}
          >
            <CiSquareCheck /> Marcar como entregue
          </DeliverButton>
        )}
      </div>
      <div className={styles.registerInfosContainer}>
        <div className={styles.registerTitle}>
          {statusIcon}
          <h2>{allProductionOrders?.production_order_status}</h2>
        </div>
        <hr />
        <span className={styles.dates}>
          prazo de entrega:{" "}
          {dataFormater(
            allProductionOrders?.production_order_deadline.toString() || "",
          )}
        </span>
        {allProductionOrders?.production_order_status === "Entregue" && (
          <span className={styles.dates}>
            Entregue: {dataFormater(allProductionOrders?.delivered_at || "")}
          </span>
        )}
        <p className={styles.descriptionField}>
          {allProductionOrders?.production_order_description
            ? allProductionOrders?.production_order_description
            : "Registro sem descrição"}
        </p>
        <hr />
        <h4>
          Soldador:{" "}
          {allProductionOrders?.employee_uuid
            ? employees.welder?.name
            : "Ainda sem soldador."}
        </h4>
        <h4>Ajudantes:</h4>
        <ul>
          <div className={styles.assistantList}>
            <li
              className={`${styles.assistant} ${!allProductionOrders?.cut_assistant && styles.undefinedAssistant}`}
            >
              <b>Corte:</b>{" "}
              {allProductionOrders?.cut_assistant
                ? employees.cutAssistant?.name
                : "Não definido."}
            </li>
            <li
              className={`${styles.assistant} ${!allProductionOrders?.fold_assistant && styles.undefinedAssistant}`}
            >
              <b>Dobra:</b>{" "}
              {allProductionOrders?.fold_assistant
                ? employees.foldAssistant?.name
                : "Não definido."}
            </li>
            <li
              className={`${styles.assistant} ${!allProductionOrders?.finishing_assistant && styles.undefinedAssistant}`}
            >
              <b>Finalização:</b>{" "}
              {allProductionOrders?.finishing_assistant
                ? employees.finishingAssistant?.name
                : "Não definido."}
            </li>
            <li
              className={`${styles.assistant} ${!allProductionOrders?.paint_assistant && styles.undefinedAssistant}`}
            >
              <b>Pintura:</b>{" "}
              {allProductionOrders?.paint_assistant
                ? employees.paintAssistant?.name
                : "Não definido."}
            </li>
          </div>
        </ul>
        <h4>Observação de entrega:</h4>
        {allProductionOrders?.production_order_status === "Entregue" ? (
          <p className={styles.observationField}>
            {allProductionOrders?.deliver_observation}
          </p>
        ) : allProductionOrders?.production_order_status === "Não entregue" ? (
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

export default ProductionOrderInfos;
