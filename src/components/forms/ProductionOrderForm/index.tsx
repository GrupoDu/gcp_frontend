"use client";

import { DefaultButton } from "@/components/ui/defaultButton";
import FormTemplate from "../formTemplate";
import styles from "./styles.module.scss";
import { DateInput } from "@/components/ui/dateInput";
import SelectInput from "@/components/ui/selectInput";
import { useRouter, useSearchParams } from "next/navigation";
import { useLoading } from "@/hooks/useLoading";
import TextInput from "@/components/ui/textInput";
import { toast } from "react-toastify";
import { handlePost } from "@/utils/handleSubmitUtils/handlePost";
import { ProductionOrderEditPayload, ProductionOrderPayload } from "@/types/productionOrder.interface";
import { useState } from "react";
import { getOptions } from "@/utils/getOptions";
import { useFetch } from "@/hooks/useFetch";
import { Product } from "@/types/product.interface";
import { handlePatch } from "@/utils/handleSubmitUtils/handlePatch";

export const ProductionOrderForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const formTo = searchParams.get("formTo") ?? "create";
  const orderUuid = searchParams.get("orderUuid") ?? "";
  const { data: products } = useFetch<Product[]>("product");
  const { setIsLoading, isLoading } = useLoading();
  const isEdit = formTo === "edit";

  const [deadline, setDeadline] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState("");

  const productsOptions = products?.map((product) => getOptions(product.productUuid, product.name));
  const editPayload: ProductionOrderEditPayload = {
    productionOrderDeadline: new Date(deadline),
    toBeProduced: quantity,
  };
  const createPayload: ProductionOrderPayload = {
    productUuid: selectedProduct,
    toBeProduced: quantity,
    productionOrderDeadline: new Date(deadline),
  };

  const hasSucceded = (success: boolean) => {
    if (!success) return;

    router.back();
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    setIsLoading(true);
    let success = false;

    if (isEdit) {
      success = await handleEdit(e, editPayload, orderUuid);
    } else {
      success = await handleCreate(e, createPayload);
    }

    hasSucceded(success);

    setIsLoading(false);
  };

  return (
    <FormTemplate submitHandler={async (e) => handleSubmit(e)}>
      <DateInput label={"Prazo"} setValue={setDeadline} value={deadline} isFilter={false} />
      <SelectInput
        options={productsOptions}
        onChange={(e) => setSelectedProduct(e.target.value)}
        defaultValue={"Selecione um produto"}
        value={selectedProduct}
        label={"Produto a ser produzido"}
        required={true}
      />
      <TextInput
        type={"number"}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
        value={quantity}
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
          {isEdit ? "Salvar" : "Registrar"}
        </DefaultButton>
      </div>
    </FormTemplate>
  );
};

/**
 * Responsável por fazer o post de uma ordem de produção
 *
 * @param e - Evento
 * @param payload - Payload a ser enviado
 */
async function handleCreate(e: React.SubmitEvent, payload: ProductionOrderPayload) {
  e.preventDefault();

  const success = await handlePost(payload, "productionOrder");

  if (!success) return false;

  toast.success("Ordem de produção criada com sucesso.");
  return true;
}

/**
 * Responsável por fazer o post de uma ordem de produção
 *
 * @param e - Evento
 * @param payload - Payload a ser enviado
 */
async function handleEdit(e: React.SubmitEvent, payload: ProductionOrderEditPayload, uuid: string) {
  e.preventDefault();

  const success = await handlePatch(payload, `productionOrder/update/${uuid}`);

  if (!success) return false;

  toast.success("");
  return true;
}
