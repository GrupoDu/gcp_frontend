"use client";

import { useFetch } from "@/hooks/useFetch";
import styles from "./styles.module.scss";
import { ProductionOrder } from "@/types/productionOrder.interface";
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
 * @param {productionOrderUuid} production_order_id - ID do registro de produção
 * @constructor
 */
const ProductionOrderInfos = ({ productionOrderUuid }: { productionOrderUuid: string }) => {
  const [deliveryObservation, setDeliveryObservation] = useState<string>("");
  const [producedQuantity, setProducedQuantity] = useState<number>(1);
  const { isLoading, setIsLoading } = useLoading();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const router = useRouter();
  const { data: productionOrder } = useFetch<ProductionOrder>(`production-order/${productionOrderUuid}`);
  const description = productionOrder?.productionOrderDescription || "Registro sem descrição";
  const welderName = productionOrder?.welders?.name || "Ainda sem soldador.";
  const title = `${productionOrder?.toBeProduced} ${productionOrder?.products?.acronym}` || "";

  const statusIcon =
    productionOrder?.productionOrderStatus === "Entregue" ? (
      <LuClipboardCheck color="green" className={styles.clipboardIcon} />
    ) : productionOrder?.productionOrderStatus === "Pendente" ? (
      <LuClipboardPenLine color="#FFD079" className={styles.clipboardIcon} />
    ) : (
      <LuClipboardX color="red" className={styles.clipboardIcon} />
    );

  const productionOrderId = productionOrder?.productionOrderUuid || "";
  const endpoint = `deliver-production-order/${productionOrderId}`;
  const redirectHref = "/producao";
  const employeeUuid = productionOrder?.welders?.employeeUuid || "";

  const productionOrderBody = {
    delivery_observation: deliveryObservation,
    delivered_product_quantity: producedQuantity,
    quantity_to_produce: productionOrder?.toBeProduced || 0,
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
          {productionOrder?.productionOrderStatus === "Pendente" && (
            <DeliverButton isProcessing={isProcessing}>
              <CiSquareCheck /> Marcar como entregue
            </DeliverButton>
          )}
        </div>
        <div className={styles.registerInfosContainer}>
          <h2>{title}</h2>
          <span className={styles.dates}>
            prazo de entrega: {dataFormater(productionOrder?.productionOrderDeadline || new Date())}
          </span>
          <span className={styles.dates}>status: {productionOrder?.productionOrderStatus}</span>
          {productionOrder?.productionOrderStatus === "Entregue" && (
            <span className={styles.dates}>Entregue: {dataFormater(productionOrder?.deliveredAt || "")}</span>
          )}
          <p className={styles.descriptionField}>{description}</p>
          <hr />
          <h4>Soldador: {welderName}</h4>
          {productionOrder?.productionOrderStatus !== "Entregue" && (
            <label className={styles.productDeliveredQuantityContainer}>
              <span>Quantidade produzida:</span>
              <input
                type="number"
                name="product-delivered-quantity"
                required
                min={0}
                max={productionOrder?.toBeProduced}
                value={producedQuantity}
                onChange={(e) => setProducedQuantity(Number(e.target.value))}
              />
            </label>
          )}
          <h4>Observação de entrega:</h4>
          {productionOrder?.productionOrderStatus === "Entregue" ? (
            <p className={styles.observationField}>{productionOrder?.deliveryObservation}</p>
          ) : productionOrder?.productionOrderStatus === "Não entregue" ? (
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
