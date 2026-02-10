"use client";

import { useState } from "react";
import styles from "./styles.module.scss";
import LinkButton from "@/components/linkButton";
import { useRouter } from "next/navigation";

const RegisterUserForm = () => {
  const [nameValue, setNameValue] = useState("");
  const [userTypeValue, setUserTypeValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: nameValue,
          user_type: userTypeValue,
          email: emailValue,
          password: "1234",
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar usuário.");
      }

      return router.push("/usuarios");
    } catch (err) {
      console.log((err as Error).message);
    }
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className={styles.registerUserContainer}
    >
      <label>
        <span>Nome completo</span>
        <input
          name="input-name"
          value={nameValue}
          onChange={(e) => setNameValue(e.target.value)}
          type="text"
          required
          placeholder="Nome do usuário completo"
        />
      </label>
      <label>
        <span>Tipo de usuário</span>
        <select
          value={userTypeValue}
          onChange={(e) => setUserTypeValue(e.target.value)}
          name="input-function"
          required
        >
          <option value="">Tipo de usuário</option>
          <option value="admin">Administrador</option>
          <option value="cliente">Cliente</option>
        </select>
      </label>
      <label>
        <span>Email</span>
        <input
          type="text"
          name="input-email"
          value={emailValue}
          required
          onChange={(e) => setEmailValue(e.target.value)}
          placeholder="email@grupodu.com.br"
        />
      </label>
      <label>
        <span>Senha</span>
        <input type="text" name="input-password" />
      </label>
      <div className={styles.buttons}>
        <LinkButton href="/usuarios" color="black">
          Cancelar
        </LinkButton>
        <button type="submit" className={styles.submitButton}>
          Enviar
        </button>
      </div>
    </form>
  );
};

export default RegisterUserForm;
