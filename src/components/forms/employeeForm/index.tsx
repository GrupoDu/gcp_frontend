"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import LinkButton from "@/components/linkButton";
import { EmployeePayload } from "@/types/employee.interface";
import { useRouter } from "next/navigation";
import SubmitButton from "@/components/ui/submitButton";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useLoading } from "@/hooks/useLoading";
import TextInput from "@/components/ui/textInput";
import SelectInput from "@/components/ui/selectInput";
import { EMPLOYEE_NAMES } from "@/constants/employeeNames.constant";

type EmployeeFormProp = {
  setEmployee: Dispatch<SetStateAction<EmployeePayload>>;
  employee: EmployeePayload;
  handleSubmit: (
    e: React.SubmitEvent,
    payload: EmployeePayload,
    router: AppRouterInstance,
    setIsLoadin: (value: boolean) => void,
  ) => void;
};

/**
 * Componente que exibe o formulário de cadastro de funcionários
 *
 * @param props
 * @param {boolean} props.isEdit - Booleano que infos se é página de edição
 * @param {string} props.employeeUuid - UUID do funcionário
 */
const EmployeeForm = ({ employee, handleSubmit, setEmployee }: EmployeeFormProp) => {
  const router = useRouter();
  const { setIsLoading } = useLoading();
  const sortedNumber = Math.floor(Math.random() * EMPLOYEE_NAMES.length);
  const roleOptions = [
    { value: "Soldador", label: "Soldador" },
    { value: "Assistente", label: "Assistente" },
  ];

  return (
    <form onSubmit={(e) => handleSubmit(e, employee, router, setIsLoading)} className={styles.registerEmployeeForm}>
      <TextInput
        type={"text"}
        onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
        value={employee.name}
        required={true}
        placeholder={EMPLOYEE_NAMES[sortedNumber]}
        label={"Nome do funcionário"}
      />
      <SelectInput
        value={employee.employeeRole}
        defaultValue={"Função"}
        label={"Função do funcionário"}
        onChange={(e) => setEmployee({ ...employee, employeeRole: e.target.value })}
        options={roleOptions}
      />
      <div className={styles.buttons}>
        <LinkButton color="black" href="/funcionarios">
          Cancelar
        </LinkButton>
        <SubmitButton>Concluir</SubmitButton>
      </div>
    </form>
  );
};

export default EmployeeForm;
