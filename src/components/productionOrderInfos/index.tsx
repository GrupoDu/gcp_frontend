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
import { handleDelivery } from "@/utils/handleDeliveryProductionOrder";
import { useRouter } from "next/navigation";
import { useLoading } from "@/hooks/useLoading";
import Loading from "@/components/ui/loading";

/**
 * Componente que exibe as informações de um registro de produção
 *
 * @param {production_order_uuid} production_order_id - ID do registro de produção
 * @constructor
 */
const ProductionOrderInfos = ({ production_order_uuid }: { production_order_uuid: string }) => {
  const [deliveryObservation, setDeliveryObservation] = useState<string>("");
  const [producedQuantity, setProducedQuantity] = useState<number>(1);
  const { isLoading, setIsLoading } = useLoading();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const router = useRouter();
  const { data: productionOrder } = useFetch<ProductionOrder>(`production-orders/${production_order_uuid}`);
  const description = productionOrder?.production_order_description || "Registro sem descrição";
  const welderName = productionOrder?.welders?.name || "Ainda sem soldador.";
  const title = `${productionOrder?.quantity_to_produce} ${productionOrder?.products?.acronym}` || "";

  console.log(productionOrder?.welders?.employee_uuid);

  const statusIcon =
    productionOrder?.production_order_status === "Entregue" ? (
      <LuClipboardCheck color="green" className={styles.clipboardIcon} />
    ) : productionOrder?.production_order_status === "Pendente" ? (
      <LuClipboardPenLine color="#FFD079" className={styles.clipboardIcon} />
    ) : (
      <LuClipboardX color="red" className={styles.clipboardIcon} />
    );

  const productionOrderId = productionOrder?.production_order_uuid || "";
  const endpoint = `deliver-production-order/${productionOrderId}`;
  const redirectHref = "/producao";
  const employeeUuid = productionOrder?.welders?.employee_uuid || "";

  const productionOrderBody = {
    delivery_observation: deliveryObservation,
    delivered_product_quantity: producedQuantity,
    quantity_to_produce: productionOrder?.quantity_to_produce || 0,
    production_order_status: "Entregue",
    delivered_at: new Date().toISOString(),
  };

  return (
    <>
      {isLoading && <Loading />}
      <form
        onSubmit={async (e) => {
          setIsLoading(true);
          await handleDelivery(
            e,
            endpoint,
            productionOrderBody,
            producedQuantity,
            employeeUuid,
            setIsProcessing,
            redirectHref,
            router,
          );
          setIsLoading(false);
        }}
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
          <h2>{title}</h2>
          <span className={styles.dates}>
            prazo de entrega: {dataFormater(productionOrder?.production_order_deadline || new Date())}
          </span>
          <span className={styles.dates}>status: {productionOrder?.production_order_status}</span>
          {productionOrder?.production_order_status === "Entregue" && (
            <span className={styles.dates}>Entregue: {dataFormater(productionOrder?.delivered_at || "")}</span>
          )}
          <p className={styles.descriptionField}>{description}</p>
          <hr />
          <h4>Soldador: {welderName}</h4>
          {productionOrder?.production_order_status !== "Entregue" && (
            <label className={styles.productDeliveredQuantityContainer}>
              <span>Quantidade produzida:</span>
              <input
                type="number"
                name="product-delivered-quantity"
                required
                min={0}
                max={productionOrder?.quantity_to_produce}
                value={producedQuantity}
                onChange={(e) => setProducedQuantity(Number(e.target.value))}
              />
            </label>
          )}
          <h4>Observação de entrega:</h4>
          {productionOrder?.production_order_status === "Entregue" ? (
            <p className={styles.observationField}>{productionOrder?.delivery_observation}</p>
          ) : productionOrder?.production_order_status === "Não entregue" ? (
            "Registro não entregue"
          ) : (
            <textarea name="observation" id="observation" onChange={(e) => setDeliveryObservation(e.target.value)} />
          )}
        </div>
      </form>
    </>
  );
};

export default ProductionOrderInfos;
