"use client";

import React, { useState } from "react";
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import { toast } from "react-toastify";

const LoginCredentials = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginTries] = useState(0);
  const [error, setError] = useState("");
  const [user_type, setUserType] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await api.post("/login", {
        email,
        password,
        user_type: user_type,
      });

      const user = response.data.user;

      const isAdmin = user.user_type === "admin";
      const isSupervisor = user.user_type === "supervisor";

      if (isAdmin) {
        setUserType(user.user_type);
        return router.push("/dashboard");
      } else if (isSupervisor) {
        setUserType(user.user_type);
        return router.push("/producao");
      } else {
        throw new Error("Usuário não encontrado.");
      }
    } catch (err) {
      const error = err as Error;
      console.log(error.message);
      setError(error.message);
      toast.error(error.message);
    }
  }

  return (
    <form onSubmit={(e) => handleLogin(e)} className={styles.loginCredentials}>
      <label>
        <span>Tipo de usuário</span>
        <select
          value={user_type}
          onChange={(e) => setUserType(e.target.value)}
          name="user-type-input"
        >
          <option value="">Selecionar tipo</option>
          <option value="admin">Admin</option>
          <option value="supervisor">Supervisor</option>
        </select>
      </label>
      <label className={styles.loginLabel}>
        <span>Email</span>
        <input
          type="email"
          name="email-input"
          placeholder="seu-email@email.com"
          className={styles.loginInput}
          onChange={(e) => setEmail(e.target.value)}
          required
          value={email}
        />
      </label>
      <label className={styles.loginLabel}>
        <span>Senha</span>
        <input
          type="password"
          name="password-input"
          placeholder="sua-senha"
          className={styles.loginInput}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
      </label>
      {loginTries > 0 && <p className={styles.loginError}>{error}</p>}
      <button type="submit">Entrar</button>
    </form>
  );
};

export default LoginCredentials;
