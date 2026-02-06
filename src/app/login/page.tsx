import React from "react";
import styles from "./page.module.scss";
import Image from "next/image";
import GrupoduImage from "../../assets/grupodu_new_logo.png";

const LoginPage = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.loginContainer}>
        <div className={styles.loginTop}>
          <Image src={GrupoduImage} alt="Login" className={styles.loginImage} />
          <h1>GCP</h1>
          <h4>Gerenciador de Controle de Produção</h4>
        </div>
        <hr />
        <div className={styles.loginCredentials}>
          <label className={styles.loginLabel}>
            <span>Email</span>
            <input
              type="email"
              name="email-input"
              placeholder="seu-email@email.com"
              className={styles.loginInput}
            />
          </label>
          <label className={styles.loginLabel}>
            <span>Senha</span>
            <input
              type="password"
              name="password-input"
              placeholder="sua-senha"
              className={styles.loginInput}
            />
          </label>
          <button type="button">Entrar</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
