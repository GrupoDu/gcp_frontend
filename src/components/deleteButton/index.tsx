"use client";

import React from "react";
import styles from "./styles.module.scss";
import { MdOutlineDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { api } from "@/services/api";
import { useLoading } from "@/hooks/useLoading";

const DeleteButton = ({ uuid, refetch, endpoint }: { uuid: string; refetch?: () => void; endpoint: string }) => {
  const { setIsLoading } = useLoading();

  async function handleDelete(uuid: string) {
    setIsLoading(true);
    try {
      await api.delete(`${endpoint}/${uuid}`);

      toast.success("Registro excluido com sucesso!");

      if (refetch) {
        refetch();
      }
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button onClick={() => handleDelete(uuid)} type="button" className={styles.deleteButton}>
      <MdOutlineDelete className={styles.buttonIcon} />
    </button>
  );
};

export default DeleteButton;
