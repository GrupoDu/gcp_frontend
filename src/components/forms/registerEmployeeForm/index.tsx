"use client";

import React, { useState } from "react";
import styles from "./styles.module.scss";
import LinkButton from "@/components/linkButton";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const RegisterEmployeeForm = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [employeeFunction, setEmployeeFunction] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: employeeName,
          employee_type: employeeFunction,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar funcionário.");
      }

      router.push("/funcionarios");
      return toast.success("Funcionario cadastrado com sucesso!");
    } catch (err) {
      console.log((err as Error).message);
    }
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className={styles.registerEmployeeForm}
    >
      <label>
        <span>Nome</span>
        <input
          type="text"
          required
          onChange={(e) => setEmployeeName(e.target.value)}
          value={employeeName}
          placeholder="Nome do funcionário"
        />
      </label>
      <label>
        <span>Cargo</span>
        <select
          required
          onChange={(e) => setEmployeeFunction(e.target.value)}
          value={employeeFunction}
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

export default RegisterEmployeeForm;
