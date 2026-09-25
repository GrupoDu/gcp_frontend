"use client";

import styles from "./page.module.scss";
import Image from "next/image";
import GrupoduImage from "../../../assets/grupodu_new_logo.png";
import LoginCredentials from "@/components/loginCredentials";
import { useEffect } from "react";
import { useLoading } from "@/hooks/useLoading";
import { toast } from "react-toastify";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const { setIsLoading, isLoading } = useLoading();
  const router = useRouter();

  const handleAutoLogin = async () => {
    setIsLoading(true);

    try {
      await api.post("/auth/refresh");

      toast.success("Auto login sucedido.");
      router.push("/dashboard");
    } catch (e) {
      const err = e as Error;
      console.error(err.message);
      toast.error(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleAutoLogin();
  }, []);

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
