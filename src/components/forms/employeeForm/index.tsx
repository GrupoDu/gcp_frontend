"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import LinkButton from "@/components/linkButton";
import { Employee } from "@/types/employee.type";
import { handleFormSubmit } from "@/utils/handleFormSubmit";
import { useEmployees } from "@/hooks/useEmployees";
import { useRouter } from "next/navigation";

const EmployeeForm = ({
  isEdit,
  employee_id,
}: {
  isEdit: boolean;
  employee_id?: string;
}) => {
  const { employeesData } = useEmployees();
  const router = useRouter();
  const [employeeValues, setEmployeeValues] = useState<Employee>({
    name: "",
    employee_type: "",
  });

  useEffect(() => {
    if (isEdit) {
      const fetchedEmpoyee = employeesData?.find(
        (employee) => employee.employee_id === employee_id,
      );

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEmployeeValues({
        name: fetchedEmpoyee?.name || "",
        employee_type: fetchedEmpoyee?.employee_type || "",
      });
    }
  }, [isEdit, employee_id, employeesData]);

  const method = isEdit ? "PUT" : "POST";
  const endpoint = isEdit ? `employees/${employee_id}` : "employees";

  return (
    <form
      onSubmit={(e) =>
        handleFormSubmit(
          e,
          method,
          employeeValues,
          endpoint,
          "/funcionarios",
          router,
        )
      }
      className={styles.registerEmployeeForm}
    >
      <label>
        <span>Nome</span>
        <input
          type="text"
          required
          onChange={(e) =>
            setEmployeeValues({ ...employeeValues, name: e.target.value })
          }
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
              employee_type: e.target.value,
            })
          }
          value={employeeValues.employee_type}
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
        <button type="submit" className={styles.submitButton}>
          Registrar
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
