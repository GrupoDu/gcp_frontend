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
import { useMemo, useState } from "react";
import { useRegisterEmployees } from "@/hooks/useProductionOrderEmployees";
import { handleDelivery } from "@/utils/handleDeliveryProductionOrder";
import { useRouter } from "next/navigation";

const ProductionOrderInfos = ({
  production_order_id,
}: {
  production_order_id: string;
}) => {
  const [deliveryObservation, setDeliveryObservation] = useState<string>("");
  const [producedQuantity, setProducedQuantity] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const router = useRouter();
  const { data: productionOrder } = useFetch<ProductionOrder>(
    "productionOrder/",
    production_order_id,
  );
  const employees = useRegisterEmployees();

  const statusIcon =
    productionOrder?.production_order_status === "Entregue" ? (
      <LuClipboardCheck color="green" className={styles.clipboardIcon} />
    ) : productionOrder?.production_order_status === "Pendente" ? (
      <LuClipboardPenLine color="#FFD079" className={styles.clipboardIcon} />
    ) : (
      <LuClipboardX color="red" className={styles.clipboardIcon} />
    );

  const productionOrderId = productionOrder?.production_order_id || "";
  const endpoint = `productionOrder/deliver/${productionOrderId}`;
  const redirectHref = "/producao";
  const employeeUuid = productionOrder?.employee_uuid || "";
  // const productionOrderBody = {
  //   delivery_observation: deliveryObservation,
  //   delivered_product_quantity: producedQuantity,
  //   requested_product_quantity: productionOrder?.product_quantity || 0,
  //   production_order_status: "Entregue",
  //   delivered_at: new Date().toISOString(),
  // };

  const productionOrderBody = useMemo(() => {
    return {
      delivery_observation: deliveryObservation,
      delivered_product_quantity: producedQuantity,
      requested_product_quantity: productionOrder?.product_quantity || 0,
      production_order_status: "Entregue",
      delivered_at: new Date().toISOString(),
    };
  }, [
    deliveryObservation,
    producedQuantity,
    productionOrder?.product_quantity,
  ]);

  return (
    <form
      onSubmit={(e) =>
        handleDelivery(
          e,
          endpoint,
          productionOrderBody,
          producedQuantity,
          employeeUuid,
          setIsProcessing,
          redirectHref,
          undefined,
          router,
        )
      }
      className={styles.productionOrderInfosContainer}
    >
      <div className={styles.buttons}>
        <LinkButton Icon={IoIosArrowBack} color="black" href={`/producao`}>
          Voltar
        </LinkButton>
        {productionOrder?.production_order_status === "Pendente" && (
          <DeliverButton isProcessing={isProcessing}>
            <CiSquareCheck /> Marcar como entregue
          </DeliverButton>
        )}
      </div>
      <div className={styles.registerInfosContainer}>
        <div className={styles.registerTitle}>
          {statusIcon}
          <h2>{productionOrder?.production_order_title}</h2>
        </div>
        <hr />
        <span className={styles.dates}>
          prazo de entrega:{" "}
          {dataFormater(
            productionOrder?.production_order_deadline.toString() || "",
          )}
        </span>
        <span className={styles.dates}>
          status: {productionOrder?.production_order_status}
        </span>
        {productionOrder?.production_order_status === "Entregue" && (
          <span className={styles.dates}>
            Entregue: {dataFormater(productionOrder?.delivered_at || "")}
          </span>
        )}
        <p className={styles.descriptionField}>
          {productionOrder?.production_order_description
            ? productionOrder?.production_order_description
            : "Registro sem descrição"}
        </p>
        <hr />
        <h4>
          Soldador:{" "}
          {productionOrder?.employee_uuid
            ? employees.welder?.name
            : "Ainda sem soldador."}
        </h4>
        <ul>
          <div className={styles.assistantList}>
            <h4>Ajudantes</h4>
            <hr />
            <li
              className={`${styles.assistant} ${!productionOrder?.cut_assistant && styles.undefinedAssistant}`}
            >
              <b>Corte:</b>{" "}
              {productionOrder?.cut_assistant
                ? employees.cutAssistant?.name
                : "Não definido."}
            </li>
            <li
              className={`${styles.assistant} ${!productionOrder?.fold_assistant && styles.undefinedAssistant}`}
            >
              <b>Dobra:</b>{" "}
              {productionOrder?.fold_assistant
                ? employees.foldAssistant?.name
                : "Não definido."}
            </li>
            <li
              className={`${styles.assistant} ${!productionOrder?.finishing_assistant && styles.undefinedAssistant}`}
            >
              <b>Finalização:</b>{" "}
              {productionOrder?.finishing_assistant
                ? employees.finishingAssistant?.name
                : "Não definido."}
            </li>
            <li
              className={`${styles.assistant} ${!productionOrder?.paint_assistant && styles.undefinedAssistant}`}
            >
              <b>Pintura:</b>{" "}
              {productionOrder?.paint_assistant
                ? employees.paintAssistant?.name
                : "Não definido."}
            </li>
          </div>
        </ul>
        {productionOrder?.production_order_status !== "Entregue" && (
          <label className={styles.productDeliveredQuantityContainer}>
            <span>Quantidade produzida:</span>
            <input
              type="number"
              name="product-delivered-quantity"
              required
              min={0}
              max={productionOrder?.product_quantity}
              value={producedQuantity}
              onChange={(e) => setProducedQuantity(Number(e.target.value))}
            />
          </label>
        )}
        <h4>Observação de entrega:</h4>
        {productionOrder?.production_order_status === "Entregue" ? (
          <p className={styles.observationField}>
            {productionOrder?.delivery_observation}
          </p>
        ) : productionOrder?.production_order_status === "Não entregue" ? (
          "Registro não entregue"
        ) : (
          <textarea
            name="observation"
            id="observation"
            onChange={(e) => setDeliveryObservation(e.target.value)}
          />
        )}
      </div>
    </form>
  );
};

export default ProductionOrderInfos;
