"use client";

import PageHeader from "@/components/ui/pageHeader";
import styles from "./styles.module.scss";
import { IoMdClipboard } from "react-icons/io";
import React, { Suspense, useState } from "react";
import { Breadcrumb } from "@/components/breadcrumb";
import { useLoading } from "@/hooks/useLoading";
import { useFetch } from "@/hooks/useFetch";
import { Product } from "@/types/product.interface";
import { useRouter } from "next/navigation";
import { DefaultButton } from "@/components/ui/defaultButton";
import TextInput from "@/components/ui/textInput";
import SelectInput from "@/components/ui/selectInput";
import FormTemplate from "@/components/forms/formTemplate";
import { DateInput } from "@/components/ui/dateInput";
import { toast } from "react-toastify";
import { ProductionOrderPayload } from "@/types/productionOrder.interface";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { handlePost } from "@/utils/handleSubmitUtils/handlePost";
import Loading from "@/components/ui/loading";

const handleSubmit = async (
  e: React.SubmitEvent,
  setIsLoading: (isLoading: boolean) => void,
  router: AppRouterInstance,
  payload: ProductionOrderPayload,
) => {
  e.preventDefault();
  setIsLoading(true);

  const success = await handlePost(payload, "/productionOrder");

  if (!success) {
    setIsLoading(false);
    return;
  }

  toast.success("Quantidade produzida registrada com sucesso");
  router.push("/producao");

  setIsLoading(true);
};

function ActivityPage() {
  const [deadline, setDeadline] = useState("");
  const { isLoading, setIsLoading } = useLoading();
  const [quantityToProduce, setQuantityToProduce] = useState(0);
  const [product, setProduct] = useState("");
  const { data: products } = useFetch<Product[]>("product");
  const router = useRouter();
  const productOptions = products?.map((product) => ({
    value: product.productUuid!,
    label: product.name,
  }));

  const payload: ProductionOrderPayload = {
    productUuid: product,
    toBeProduced: quantityToProduce,
    productionOrderDeadline: new Date(deadline),
  };

  return (
    <div className="pageContainer">
      <PageHeader HeaderIcon={IoMdClipboard} headerTitle="Produção" />
      {isLoading && <Loading />}
      <main className={`mainContainer ${isLoading ? "loading" : ""}`}>
        <Breadcrumb />
        <h2>Registrar atividade</h2>
        <FormTemplate submitHandler={(e) => handleSubmit(e, setIsLoading, router, payload)}>
          <Suspense>
            <DateInput label={"Prazo"} setValue={setDeadline} value={deadline} isFilter={false} />
          </Suspense>
          <SelectInput
            options={productOptions}
            onChange={(e) => setProduct(e.target.value)}
            defaultValue={"Selecione um produto"}
            value={product}
            label={"Produto a ser produzido"}
            required={true}
          />
          <TextInput
            type={"number"}
            onChange={(e) => setQuantityToProduce(parseInt(e.target.value))}
            value={quantityToProduce}
            min={0}
            label={"Quantidade a ser produzida"}
          />
          <div className={styles.buttons}>
            <DefaultButton
              type={"button"}
              onClick={() => {
                setIsLoading(true);
                router.back();
              }}
              className={styles.backButton}
            >
              Voltar
            </DefaultButton>
            <DefaultButton type={"submit"} isDisabled={isLoading}>
              Registrar
            </DefaultButton>
          </div>
        </FormTemplate>
      </main>
    </div>
  );
}

export default ActivityPage;
