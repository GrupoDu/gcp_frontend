"use client";

import styles from "./styles.module.scss";
import FormTemplate from "@/components/forms/formTemplate";
import { toast } from "react-toastify";
import TextInput from "@/components/ui/textInput";
import React, { useState } from "react";
import SelectInput, { SelectOption } from "@/components/ui/selectInput";
import { useRouter, useSearchParams } from "next/navigation";
import LinkButton from "@/components/linkButton";
import SubmitButton from "@/components/ui/submitButton";
import { api } from "@/services/api";
import { useFetch } from "@/hooks/useFetch";
import { Product } from "@/types/product.type";
import { Employee } from "@/types/employee.type";

const ActivityForm = () => {
  const [employee, setEmployee] = useState("");
  const [producedQuantity, setProducedQuantity] = useState(0);
  const [product, setProduct] = useState("");
  const [activityType, setActivityType] = useState("");
  const [activityDescription, setActivityDescription] = useState("");
  const { data: products } = useFetch<Product[]>("products");
  const { data: employees } = useFetch<Employee[]>("employees");
  const router = useRouter();
  const searchParams = useSearchParams();
  const employeeRole = searchParams.get("employee");
  const productOptions = products?.map((product) => ({
    value: product.product_uuid!,
    label: product.name,
  }));

  const isWelder = employeeRole === "soldador";
  const isAssistant = employeeRole === "assistente";
  const assistantRoleOptions = [
    {
      value: "Corte",
      label: "Corte",
    },
    {
      value: "Pintura",
      label: "Pintura",
    },
    {
      value: "Acabamento",
      label: "Acabamento",
    },
    {
      value: "Dobra",
      label: "Dobra",
    },
  ];

  const handleWelderSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      await api.post("/welders-activities/register", {
        produced_quantity: producedQuantity,
        product_uuid: product,
        welder_uuid: employee,
      });

      router.push("/producao");
    } catch (err) {
      const error = err as Error;
      toast.error(error.message);
    }
  };
  const handleAssistantSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      await api.post("assistants-activities/", {
        produced_quantity: producedQuantity,
        activity_type: activityType,
        assistant_uuid: employee,
        activity_description: activityDescription || "",
      });

      router.push("/producao");
    } catch (err) {
      const error = err as Error;
      toast.error(error.message);
    }
  };
  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      if (isWelder) return handleWelderSubmit(e);
      if (isAssistant) return handleAssistantSubmit(e);

      router.push("/producao");
      toast.success("Quantidade produzida registrada com sucesso");
    } catch (err) {
      const error = err as Error;
      toast.error(error.message);
    }
  };
  const lastInput = () => {
    if (isWelder)
      return (
        <SelectInput
          options={productOptions}
          onChange={(e) => setProduct(e.target.value)}
          defaultValue={"Selecione um produto"}
          value={product}
          label={"Produto produzido"}
          required={true}
        />
      );

    if (isAssistant)
      return (
        <label className={styles.activityDescriptionContainer}>
          <h4>Descrição da atividade</h4>
          <textarea value={activityDescription} onChange={(e) => setActivityDescription(e.target.value)} />
        </label>
      );
  };

  return (
    <FormTemplate submitHandler={(e) => handleSubmit(e)}>
      <SelectInput
        options={selectFormatter(employees, employeeRole)}
        defaultValue="Selecione o funcionário"
        value={employee}
        onChange={(e) => setEmployee(e.target.value)}
        label="Soldador"
        required={true}
      />
      {isAssistant && (
        <SelectInput
          options={assistantRoleOptions}
          onChange={(e) => setActivityType(e.target.value)}
          defaultValue={"Selecionar atividade"}
          value={activityType}
          label={"Atividade do assistente"}
        />
      )}
      <TextInput
        label="Quantidade produzida"
        type="number"
        min={0}
        value={producedQuantity}
        onChange={(e) => setProducedQuantity(Number(e.target.value))}
        required={true}
      />
      {lastInput()}
      <div className={styles.buttonsContainer}>
        <LinkButton href={"/producao"} color={"black"}>
          Cancelar
        </LinkButton>
        <SubmitButton canEdit={false}>Registrar</SubmitButton>
      </div>
    </FormTemplate>
  );
};

function selectFormatter(list: Employee[] | undefined, employeeRole: string | null): SelectOption[] | undefined {
  return list?.map((employee) => {
    if (employee.employee_role === employeeRole) {
      return {
        value: employee.employee_uuid!,
        label: employee.name,
      };
    }

    return {
      value: "",
      label: "",
    };
  });
}

export default ActivityForm;
