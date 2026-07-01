"use client";

import styles from "./styles.module.scss";
import SelectInput from "@/components/ui/selectInput";
import { useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { Employee } from "@/types/employee.type";
import TextInput from "@/components/ui/textInput";
import { Product } from "@/types/product.type";
import { DefaultButton } from "@/components/ui/defaultButton";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import { toast } from "react-toastify";

export const WelderActivityForm = () => {
  const [welder, setWelder] = useState("");
  const [producedQuantity, setProducedQuantity] = useState(0);
  const [textLimitCount, setTextLimitCount] = useState(50);
  const [description, setDescription] = useState("");
  const [isGeneralActivity, setIsGeneralActivity] = useState(false);
  const [producedProduct, setProducedProduct] = useState("");

  const router = useRouter();
  const { data: welders } = useFetch<Employee[]>("employees/welders");
  const { data: products } = useFetch<Product[]>("products");

  const weldersOptions = welders?.map((welder) => ({
    value: welder.employee_uuid || "",
    label: welder.name,
  }));
  const productsOptions =
    products?.map((product) => ({
      value: product.product_uuid || "",
      label: product.acronym,
    })) || [];
  const handleTextLimitChange = (value: string) => {
    const fullLengthString = value.length;
    setTextLimitCount(50 - fullLengthString);
    setDescription(value);
  };

  productsOptions.push({
    value: "Solda Geral",
    label: "Solda Geral",
  });

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      await api.post("welders-activities/register", {
        welder_uuid: welder,
        product_uuid: producedProduct || null,
        produced_quantity: producedQuantity,
        description_general_activity: description,
        is_general_activity: isGeneralActivity,
      });

      toast.success("Atividade registrada com sucesso!");
      router.push("/soldadores?page=1&per_page=13");
    } catch (err) {
      const error = err as Error;
      console.log(error.message);
    }
  };

  return (
    <form className={"form"} onSubmit={handleSubmit}>
      <SelectInput
        options={weldersOptions}
        value={welder}
        label={"Soldador"}
        required={true}
        defaultValue={"Selecione um soldador"}
        onChange={(e) => setWelder(e.target.value)}
      />
      <TextInput
        type={"number"}
        onChange={(e) => setProducedQuantity(parseInt(e.target.value, 10))}
        value={producedQuantity}
        required={true}
        label={"Quantidade produzida"}
      />
      <SelectInput
        options={productsOptions}
        onChange={(e) => setProducedProduct(e.target.value)}
        defaultValue={"Selecione o produto"}
        value={producedProduct}
        label={"Produto produzido"}
      />
      <div className={styles.inputCheck}>
        <input type="checkbox" checked={isGeneralActivity} onChange={(e) => setIsGeneralActivity(e.target.checked)} />
        <span>Solda Geral</span>
      </div>
      <label className={`${styles.textareaContainer} ${isGeneralActivity && styles.isActive}`}>
        <span>Descição de atividade geral</span>
        <textarea
          onChange={(e) => handleTextLimitChange(e.target.value)}
          maxLength={50}
          placeholder={"Fechamento de caçamba"}
          className={"input"}
        ></textarea>
        <span className={styles.textLimitCount}>Caracteres restantes: {textLimitCount}</span>
      </label>
      <div className={styles.buttons}>
        <div className={styles.buttonWrapper}>
          <DefaultButton
            type={"button"}
            style={{ color: "white", backgroundColor: "black", border: "none" }}
            onClick={() => router.back()}
          >
            Voltar
          </DefaultButton>
        </div>
        <div className={styles.buttonWrapper}>
          <DefaultButton type={"submit"}>Registrar</DefaultButton>
        </div>
      </div>
    </form>
  );
};
