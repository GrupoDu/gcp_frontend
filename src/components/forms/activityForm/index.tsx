"use client";

import FormTemplate from "@/components/forms/formTemplate";
import { toast } from "react-toastify";
import TextInput from "@/components/ui/textInput";
import React, { useState } from "react";
import SelectInput from "@/components/ui/selectInput";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import { useFetch } from "@/hooks/useFetch";
import { DateInput } from "@/components/ui/dateInput";
import { DefaultButton } from "@/components/ui/defaultButton";
import { Product } from "@/types/product.interface";

const ActivityForm = () => {
  const [deadline, setDeadline] = useState("");
  const [quantityToProduce, setQuantityToProduce] = useState(0);
  const [product, setProduct] = useState("");
  const { data: products } = useFetch<Product[]>("product");
  const router = useRouter();
  const productOptions = products?.map((product) => ({
    value: product.productUuid!,
    label: product.name,
  }));

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      const payload = {
        productUuid: product,
        toBeProduced: quantityToProduce,
        productionOrderDeadline: new Date(deadline),
      };

      await api.post("/productionOrder", payload);

      router.push("/producao");
      toast.success("Quantidade produzida registrada com sucesso");
    } catch (err) {
      const error = err as Error;
      toast.error(error.message);
    }
  };

  return (
    <FormTemplate submitHandler={(e) => handleSubmit(e)}>
      <DateInput label={"Prazo"} setValue={setDeadline} value={deadline} isFilter={false} />
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
      <DefaultButton type={"submit"}>Registrar</DefaultButton>
    </FormTemplate>
  );
};

export default ActivityForm;
