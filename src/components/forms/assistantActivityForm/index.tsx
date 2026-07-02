"use client";

import styles from "./styles.module.scss";
import SelectInput from "@/components/ui/selectInput";
import { useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { Employee } from "@/types/employee.type";
import TextInput from "@/components/ui/textInput";
import { DefaultButton } from "@/components/ui/defaultButton";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import { toast } from "react-toastify";

export const AssistantActivityForm = () => {
  const [assistant, setAssistant] = useState("");
  const [producedQuantity, setProducedQuantity] = useState(0);
  const [activityType, setActivityType] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();
  const { data: assistants } = useFetch<Employee[]>("employees/assistants");

  const assistantsOptions = assistants?.map((assistants) => ({
    value: assistants.employee_uuid || "",
    label: assistants.name,
  }));
  const activityOptions = [
    {
      label: "Corte",
      value: "Corte",
    },
    {
      label: "Dobra",
      value: "Dobra",
    },
    {
      label: "Acabamento",
      value: "Acabamento",
    },
    {
      label: "Pintura",
      value: "Pintura",
    },
  ];

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      await api.post("assistants-activities", {
        assistant_uuid: assistant,
        activity_description: description || null,
        produced_quantity: producedQuantity,
        activity_type: activityType,
      });

      toast.success("Atividade registrada com sucesso!");
      router.push("/assistentes?page=1&per_page=13");
    } catch (err) {
      const error = err as Error;
      console.log(error.message);
    }
  };

  return (
    <form className={"form"} onSubmit={handleSubmit}>
      <SelectInput
        options={assistantsOptions}
        value={assistant}
        label={"Assistente"}
        required={true}
        defaultValue={"Selecione um assistente"}
        onChange={(e) => setAssistant(e.target.value)}
      />
      <TextInput
        type={"number"}
        onChange={(e) => setProducedQuantity(parseInt(e.target.value, 10))}
        value={producedQuantity}
        required={true}
        label={"Quantidade produzida"}
      />
      <SelectInput
        options={activityOptions}
        onChange={(e) => setActivityType(e.target.value)}
        defaultValue={"Selecione o produto"}
        value={activityType}
        label={"Atividade realizada"}
      />
      <label className={`${styles.textareaContainer}`}>
        <span>Descição de atividade geral</span>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          maxLength={50}
          placeholder={"Fechamento de caçamba"}
          className={"input"}
        ></textarea>
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
