"use client";

import SelectInput from "../ui/selectInput";
import { useFetch } from "@/hooks/useFetch";
import { Employee } from "@/types/employee.interface";
import { getOptions } from "@/utils/getOptions";

type SelectAssistantInputProps = {
  setAssistantAction: (value: string) => void;
  assistant: string;
};

export const SelectAssistantInput = ({ setAssistantAction, assistant }: SelectAssistantInputProps) => {
  const { data: assistants } = useFetch<Employee[]>("employee/filter?role=Assistente");

  const assistantsOptions = assistants?.map((assistant) => getOptions(assistant.employeeUuid, assistant.name));

  return (
    <>
      <SelectInput
        options={assistantsOptions}
        value={assistant}
        label={"Assistente"}
        required={true}
        defaultValue={"Selecione um assistente"}
        onChange={(e) => setAssistantAction(e.target.value)}
      />
    </>
  );
};
