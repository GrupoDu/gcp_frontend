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
  const [user_role, setUserRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function tryAutoLogin() {
    setIsLoading(true);
    try {
      const response = await api.get("/login/verify");

      const autoLoginPayload = response.data;
      const isAdmin = autoLoginPayload.user_role === "Admin";

      if (isAdmin) return router.push("/dashboard");

      return router.push("/producao");
    } catch (err) {
      setIsLoading(false);
      const error = err as Error;

      console.log(error.message);
    }
  }

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.post("/login", {
        email,
        password,
        user_role: user_role,
      });

      const user = response.data.data.user;

      redirectByUserRole(user.user_role, router, setUserRole);
    } catch (err) {
      const error = err as Error;
      setLoginTries((prevTries) => prevTries + 1);
      setIsLoading(false);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    tryAutoLogin();
  }, []);

  return (
    <form onSubmit={(e) => handleLogin(e)} className={styles.loginCredentials}>
      <label>
        <span>Tipo de usuário</span>
        <select value={user_role} onChange={(e) => setUserRole(e.target.value)} name="user-type-input">
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
      {loginTries > 0 && (
        <p className={styles.loginError}>Credenciais inválidas. Verifique a senha, email e tipo de usuário</p>
      )}
      <button disabled={isLoading} className={`${isLoading && styles.loadingDisabled}`} type="submit">
        {isLoading && <ClipLoader color="#fff" size={15} />}Entrar
      </button>
    </form>
  );
};

function redirectByUserRole(user_role: string, router: AppRouterInstance, setUserRole: (value: string) => void) {
  const isAdmin = user_role === "admin";
  const isSupervisor = user_role === "supervisor";

  if (isAdmin) {
    setUserRole(user_role);
    return router.push("/dashboard");
  } else if (isSupervisor) {
    setUserRole(user_role);
    return router.push("/producao");
  } else {
    throw new Error("Usuário não encontrado.");
  }
}

export default LoginCredentials;
