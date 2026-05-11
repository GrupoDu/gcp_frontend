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
import submitButton from "@/components/ui/submitButton";
import { api } from "@/services/api";

const ActivityForm = () => {
  const [welder, setWelder] = useState("");
  const [producedQuantity, setProducedQuantity] = useState(0);
  const { welders } = useEmployeeRole();
  const router = useRouter();
  const [canEdit, setCanEdit] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      await api.patch(`/employees/produced-quantity/${welder}`, {
        produced_quantity: producedQuantity,
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
      />
      <TextInput
        label="Quantidade produzida"
        type="number"
        min={0}
        value={producedQuantity}
        onChange={(e) => setProducedQuantity(Number(e.target.value))}
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
