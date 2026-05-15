"use client";

import styles from "./styles.module.scss";
import FormTemplate from "@/components/forms/formTemplate";
import { toast } from "react-toastify";
import TextInput from "@/components/ui/textInput";
import { useState } from "react";
import SelectInput, { SelectOption } from "@/components/ui/selectInput";
import { useEmployeeRole } from "@/hooks/useEmployeeRole";
import { useRouter } from "next/navigation";
import LinkButton from "@/components/linkButton";
import SubmitButton from "@/components/ui/submitButton";
import { api } from "@/services/api";
import { useProducts } from "@/hooks/useProducts";

const ActivityForm = () => {
  const [welder, setWelder] = useState("");
  const [producedQuantity, setProducedQuantity] = useState(0);
  const [product, setProduct] = useState("");
  const { productsData } = useProducts();
  const { welders } = useEmployeeRole();
  const router = useRouter();
  const productOptions = productsData?.map((product) => ({
    value: product.product_uuid!,
    label: product.name,
  }));

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      await api.patch(`/employees/produced-quantity/${welder}`, {
        produced_quantity: producedQuantity,
      });
      await api.post("/welders-activities/register", {
        produced_quantity: producedQuantity,
        product_uuid: product,
        welder_uuid: welder,
      });

      router.back();
      toast.success("Quantidade produzida registrada com sucesso");
    } catch (err) {
      const error = err as Error;
      toast.error(error.message);
    }
  };

  const welderList: SelectOption[] | undefined = welders?.map((welder) => ({
    value: welder.employee_uuid!,
    label: welder.name,
  }));

  return (
    <FormTemplate submitHandler={(e) => handleSubmit(e)}>
      <SelectInput
        options={welderList}
        defaultValue="Selecione o soldador"
        value={welder}
        onChange={(e) => setWelder(e.target.value)}
        label="Soldador"
        required={true}
      />
      <SelectInput
        options={productOptions}
        onChange={(e) => setProduct(e.target.value)}
        defaultValue={"Selecione um produto"}
        value={product}
        label={"Produto produzido"}
        required={true}
      />
      <TextInput
        label="Quantidade produzida"
        type="number"
        min={1}
        value={producedQuantity}
        onChange={(e) => setProducedQuantity(Number(e.target.value))}
        required={true}
      />
      <div className={styles.buttonsContainer}>
        <LinkButton href={"/producao"} color={"black"}>
          Cancelar
        </LinkButton>
        <SubmitButton canEdit={false}>Registrar</SubmitButton>
      </div>
    </FormTemplate>
  );
};

export default ActivityForm;
