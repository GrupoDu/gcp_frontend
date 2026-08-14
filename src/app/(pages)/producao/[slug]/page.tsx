"use client";

import PageHeader from "@/components/ui/pageHeader";
import { IoIosArrowBack, IoMdClipboard } from "react-icons/io";
import styles from "./page.module.scss";
import ProductionOrderSection from "@/components/productionOrderSection";
import { useState } from "react";
import { useLoading } from "@/hooks/useLoading";
import { useParams, useRouter } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";
import { ProductionOrder } from "@/types/productionOrder.interface";
import { Status } from "@/enums/status.enum";
import { toast } from "react-toastify";
import Loading from "@/components/ui/loading";
import LinkButton from "@/components/linkButton";
import DeliverButton from "@/components/ui/deliverButton";
import { CiSquareCheck } from "react-icons/ci";
import { titleFormatter } from "@/utils/titleFormatter";
import { dataFormater } from "@/utils/dataFormater";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { getSlug } from "@/utils/getSlug";
import { handlePatch } from "@/utils/handleSubmitUtils/handlePatch";

type DeliveryPayload = {
  deliveryObservation: string;
  producedQuantity: number;
};

const handleDelivery = async (
  e: React.SubmitEvent,
  payload: DeliveryPayload,
  setIsLoading: (isLoading: boolean) => void,
  router: AppRouterInstance,
) => {
  e.preventDefault();

  const productionOrderUuid = getSlug()[2];

  setIsLoading(true);

  const success = await handlePatch(payload, `productionOrder/deliver/${productionOrderUuid || ""}`);

  if (!success) {
    setIsLoading(false);
    return;
  }

  toast.success("Produção entregue com sucesso.");
  router.push("/producao?page=1&pageSize=10");

  setIsLoading(false);
};

function ViewProductionOrderPage() {
  const { slug: productionOrderUuid } = useParams();
  const [deliveryObservation, setDeliveryObservation] = useState<string>("");
  const [producedQuantity, setProducedQuantity] = useState<number>(1);
  const { isLoading, setIsLoading } = useLoading();
  const router = useRouter();
  const { data: productionOrder } = useFetch<ProductionOrder>(`productionOrder/${productionOrderUuid}`);

  const description = productionOrder?.productionOrderDescription || "Registro sem descrição";
  const formatedStatus = Status[productionOrder?.productionOrderStatus as keyof typeof Status];
  const isDone = formatedStatus === "Finalizado";
  const payload = {
    deliveryObservation,
    producedQuantity,
  };

  return (
    <div className="pageContainer">
      <PageHeader HeaderIcon={IoMdClipboard} headerTitle="Registro" />
      {isLoading && <Loading />}
      <main className={`mainContainer ${isLoading ? "loading" : ""}`}>
        <form
          onSubmit={(e) => handleDelivery(e, payload, setIsLoading, router)}
          className={styles.productionOrderInfosContainer}
        >
          <div className={styles.buttons}>
            <LinkButton Icon={IoIosArrowBack} color="black" href={`/producao`}>
              Voltar
            </LinkButton>
            {!isDone && (
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
            {isDone && (
              <span className={styles.dates}>Entregue: {dataFormater(productionOrder?.deliveredAt || "")}</span>
            )}
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
        <h3>
          <IoMdClipboard /> Ordens de produção pendentes
        </h3>
        <ProductionOrderSection />
      </main>
    </div>
  );
}

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

export default ViewProductionOrderPage;
