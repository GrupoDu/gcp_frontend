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

export const WelderActivityForm = () => {
  const [welder, setWelder] = useState("");
  const [producedQuantity, setProducedQuantity] = useState(0);
  const [producedProduct, setProducedProduct] = useState("");

  const router = useRouter();
  const { data: welders } = useFetch<Employee[]>("employees/welders");
  const { data: products } = useFetch<Product[]>("products");

  const weldersOptions = welders?.map((welder) => ({
    value: welder.employee_uuid || "",
    label: welder.name,
  }));
  const productsOptions = products?.map((product) => ({
    value: product.product_uuid || "",
    label: product.acronym,
  }));

  return (
    <form className={"form"}>
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
        required={true}
        label={"Produto produzido"}
      />
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
