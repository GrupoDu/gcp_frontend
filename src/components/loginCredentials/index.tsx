"use client";

import React, { useState } from "react";
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";

const LoginCredentials = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginTries, setLoginTries] = useState(0);
  const [error, setError] = useState("");
  const [user_type, setUserType] = useState("");
  const router = useRouter();

  async function handleLogin() {
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
          user_type: user_type,
        }),
      });

      if (!response.ok) {
        setLoginTries(loginTries + 1);
        throw new Error("Erro ao fazer login. Verifique suas credenciais.");
      }

      const user = await response.json();

      console.log(user.user);

      if (user.user.user_type === "admin") {
        setUserType(user.user.user_type);
        return router.push("/dashboard");
      }

      if (user.user.user_type === "supervisor") {
        setUserType(user.user.user_type);
        return router.push("/producao");
      }
    } catch (err) {
      console.log((err as Error).message);
      setError((err as Error).message);
    }
  }

  return (
    <div className={styles.loginCredentials}>
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
      <button onClick={handleLogin} type="button">
        Entrar
      </button>
    </div>
  );
};

export default LoginCredentials;
