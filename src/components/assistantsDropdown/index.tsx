"use client";

import SelectInput from "@/components/ui/selectInput";
import { useFetch } from "@/hooks/useFetch";
import { Employee } from "@/types/employee.interface";

type AssistantsDropdownProps = {
  setAssistantsFilter: (value: string) => void;
  assistantsFilter: string;
};

const AssistantsDropdown = (props: AssistantsDropdownProps) => {
  const { setAssistantsFilter, assistantsFilter } = props;
  const { data: assistants } = useFetch<Employee[]>("employee/filter?role=Assistente");
  const assistantsOptions = assistants?.map((assistant) => ({
    value: assistant.employeeUuid || "",
    label: assistant.name || "",
  }));

  return (
    <SelectInput
      options={assistantsOptions}
      onChange={(e) => setAssistantsFilter(e.target.value)}
      defaultValue={"Selecione um assistente"}
      value={assistantsFilter}
      label={"Assistentes"}
    />
  );
};

export default AssistantsDropdown;
