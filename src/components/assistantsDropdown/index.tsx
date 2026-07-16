"use client";

import { useEffect, useState } from "react";
import SelectInput from "@/components/ui/selectInput";
import getEmployees from "@/utils/getEmployees";

type AssistantsDropdownProps = {
  setAssistantsFilter: (value: string) => void;
  assistantsFilter: string;
};

const AssistantsDropdown = (props: AssistantsDropdownProps) => {
  const { setAssistantsFilter, assistantsFilter } = props;
  const [assistantsDropdown, setAssistantsDropdown] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const { assistants } = await getEmployees();

        if (!assistants) throw new Error("Funcionários não encontrados.");

        assistants.forEach((assistant) =>
          setAssistantsDropdown((prevState) => [
            ...prevState,
            { value: assistant.employeeUuid || "", label: assistant.name || "" },
          ]),
        );
      } catch (err) {
        const error = err as Error;
        console.error(error.message);
      }
    })();
  }, []);

  return (
    <SelectInput
      options={assistantsDropdown}
      onChange={(e) => setAssistantsFilter(e.target.value)}
      defaultValue={"Selecione um assistente"}
      value={assistantsFilter}
      label={"Assistentes"}
    />
  );
};

export default AssistantsDropdown;
