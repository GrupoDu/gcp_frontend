"use client";

import styles from "./styles.module.scss";
import SelectInput from "@/components/ui/selectInput";
import { useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { Employee } from "@/types/employee.interface";
import TextInput from "@/components/ui/textInput";
import { Product } from "@/types/product.interface";
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
  const { data: welders } = useFetch<Employee[]>("employee/filter?role=Soldador");
  const { data: products } = useFetch<Product[]>("product");

  const weldersOptions = welders?.map((welder) => ({
    value: welder.employeeUuid || "",
    label: welder.name,
  }));
  const productsOptions =
    products?.map((product) => ({
      value: product.productUuid || "",
      label: product.acronym,
    })) || [];
  const handleTextLimitChange = (value: string) => {
    const fullLengthString = value.length;
    setTextLimitCount(50 - fullLengthString);
    setDescription(value);
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      await api.post("welderActivity/register", {
        welderUuid: welder,
        productUuid: producedProduct || null,
        producedQuantity: producedQuantity,
        descriptionGeneralActivity: description,
        isGeneralActivity: isGeneralActivity,
      });

      toast.success("Atividade registrada com sucesso!");
      router.push("/soldadores?page=1&pageSize=13");
    } catch (err) {
      const error = err as Error;
      toast.error(error.message);
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
        isDisabled={isGeneralActivity}
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
