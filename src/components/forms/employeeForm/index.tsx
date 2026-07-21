"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import LinkButton from "@/components/linkButton";
import { Employee } from "@/types/employee.interface";
import { handleFormSubmit } from "@/utils/handleFormSubmit";
import { useRouter } from "next/navigation";
import SubmitButton from "@/components/ui/submitButton";
import { useFetch } from "@/hooks/useFetch";

/**
 * Componente que exibe o formulário de cadastro de funcionários
 *
 * @param props
 * @param {boolean} props.isEdit - Booleano que infos se é página de edição
 * @param {string} props.employeeUuid - UUID do funcionário
 */
const EmployeeForm = ({ isEdit, employeeUuid }: { isEdit: boolean; employeeUuid?: string }) => {
  const { data: employees } = useFetch<Employee[]>("employee");
  const router = useRouter();
  const [canEdit, setCanEdit] = useState(false);
  const [employeeValues, setEmployeeValues] = useState<Record<string, string>>({
    name: "",
    employeeRole: "",
  });

  useEffect(() => {
    if (isEdit) {
      const fetchedEmployee = employees?.find((employee) => employee.employeeUuid === employeeUuid);

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEmployeeValues({
        name: fetchedEmployee?.name || "",
        employeeRole: fetchedEmployee?.employeeRole || "",
      });

      setCanEdit(!!fetchedEmployee);
    }
  }, [isEdit, employeeUuid, employees]);

  const method = isEdit ? "PUT" : "POST";
  const endpoint = isEdit ? `employee/${employeeUuid}` : "employee";

  return (
    <form
      onSubmit={(e) => handleFormSubmit(e, { method, endpoint, bodyValues: employeeValues }, { router, canEdit })}
      className={styles.registerEmployeeForm}
    >
      <label>
        <span>Nome</span>
        <input
          type="text"
          required
          onChange={(e) => setEmployeeValues({ ...employeeValues, name: e.target.value })}
          value={employeeValues.name}
          placeholder="Nome do funcionário"
        />
      </label>
      <label>
        <span>Cargo</span>
        <select
          required
          onChange={(e) =>
            setEmployeeValues({
              ...employeeValues,
              employeeRole: e.target.value,
            })
          }
          value={employeeValues.employeeRole}
          name="employee-function"
        >
          <option value="">Selecionar função</option>
          <option value="soldador">Soldador</option>
          <option value="assistente">Assistente</option>
        </select>
      </label>
      <div className={styles.buttons}>
        <LinkButton color="black" href="/funcionarios">
          Cancelar
        </LinkButton>
        <SubmitButton canEdit={canEdit}>{isEdit ? "Salvar" : "Cadastrar"}</SubmitButton>
      </div>
    </form>
  );
};

export default EmployeeForm;
