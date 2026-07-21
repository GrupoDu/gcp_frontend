"use client";

import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import { toast } from "react-toastify";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ClipLoader } from "react-spinners";

const LoginCredentials = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginTries, setLoginTries] = useState(0);
  const [userRole, setUserRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
        userRole: userRole,
      });

      const data = await response.data;
      console.log(data.message);

      localStorage.setItem("@App:userRole", data.data.userRole);

      redirectByUserRole(data.data.userRole, router, setUserRole);
    } catch (err) {
      const error = err as Error;
      setLoginTries((prevTries) => prevTries + 1);
      setIsLoading(false);
      toast.error(error.message);
    }
  }

  return (
    <form onSubmit={(e) => handleLogin(e)} className={styles.loginCredentials}>
      <label>
        <span>Tipo de usuário</span>
        <select value={userRole} onChange={(e) => setUserRole(e.target.value)} name="user-type-input">
          <option value="">Selecionar tipo</option>
          <option value="Admin">Admin</option>
          <option value="Supervisor">Supervisor</option>
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
      {loginTries > 0 && (
        <p className={styles.loginError}>Credenciais inválidas. Verifique a senha, email e tipo de usuário</p>
      )}
      <button disabled={isLoading} className={`${isLoading && styles.loadingDisabled}`} type="submit">
        {isLoading && <ClipLoader color="#fff" size={15} />}Entrar
      </button>
    </form>
  );
};

function redirectByUserRole(userRole: string, router: AppRouterInstance, setUserRole: (value: string) => void) {
  const isAdmin = userRole === "Admin";
  const isSupervisor = userRole === "Supervisor";

  if (isAdmin) {
    setUserRole(userRole);
    return router.push("/dashboard");
  } else if (isSupervisor) {
    setUserRole(userRole);
    return router.push("/producao");
  } else {
    throw new Error("Usuário não encontrado.");
  }
}

export default LoginCredentials;
