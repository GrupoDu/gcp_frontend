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
import { titleFormatter } from "@/utils/titleFormatter";
import { toast } from "react-toastify";
import { api } from "@/services/api";
import { Status } from "@/enums/status.enum";

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
  const { data: productionOrder } = useFetch<ProductionOrder>(`productionOrder/${productionOrderUuid}`);

  const description = productionOrder?.productionOrderDescription || "Registro sem descrição";
  const formatedStatus = Status[productionOrder?.productionOrderStatus as keyof typeof Status];
  const isInProduction = formatedStatus === "Em Produção";
  const isDone = formatedStatus === "Finalizado";
  const productionOrderId = productionOrder?.productionOrderUuid || "";

  const handleDelivery = async (e: React.SubmitEvent) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      await api.patch(`productionOrder/deliver/${productionOrderId}`, {
        deliveryObservation: deliveryObservation,
        producedQuantity: producedQuantity,
      });

      router.push("/producao?page=1&pageSize=10");
    } catch (e) {
      const err = e as Error;
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <form onSubmit={(e) => handleDelivery(e)} className={styles.productionOrderInfosContainer}>
        <div className={styles.buttons}>
          <LinkButton Icon={IoIosArrowBack} color="black" href={`/producao`}>
            Voltar
          </LinkButton>
          {isInProduction && (
            <DeliverButton>
              <CiSquareCheck /> Marcar como entregue
            </DeliverButton>
          )}
        </div>
        <div className={styles.registerInfosContainer}>
          <h2>{titleFormatter(productionOrder?.product?.acronym, productionOrder?.toBeProduced)}</h2>
          <span className={styles.dates}>
            prazo de entrega: {dataFormater(productionOrder?.productionOrderDeadline || new Date())}
          </span>
          <span className={styles.dates}>status: {formatedStatus}</span>
          {isDone && <span className={styles.dates}>Entregue: {dataFormater(productionOrder?.deliveredAt || "")}</span>}
          <p className={styles.descriptionField}>{description}</p>
          <hr />
          {!isDone && (
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
          <DeliveryObservation
            status={formatedStatus}
            deliveryObservation={productionOrder?.deliveryObservation}
            setDeliveryObservation={setDeliveryObservation}
          />
        </div>
      </form>
    </>
  );
};

function DeliveryObservation({
  status,
  deliveryObservation,
  setDeliveryObservation,
}: {
  status: string;
  deliveryObservation?: string;
  setDeliveryObservation: (value: string) => void;
}) {
  const isDone = status === "Finalizado";
  const isNotDelivered = status === "Não Entregue";

  if (isDone) return <p className={styles.observationField}>{deliveryObservation}</p>;

  if (isNotDelivered) return "Registro não entregue";

  return (
    <>
      <h4>Observação de entrega:</h4>
      <textarea name="observation" id="observation" onChange={(e) => setDeliveryObservation(e.target.value)} />
    </>
  );
}

export default ProductionOrderInfos;
