import styles from "./page.module.scss";
import Image from "next/image";
import GrupoduImage from "../../../assets/grupodu_new_logo.png";
import LoginCredentials from "@/components/loginCredentials";

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
        <LoginCredentials />
      </div>
    </div>
  );
};

export default LoginPage;
