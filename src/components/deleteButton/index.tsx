"use client";

import React from "react";
import styles from "./styles.module.scss";
import { MdOutlineDelete } from "react-icons/md";
import { authToken } from "@/hooks/useFetch";
import { toast } from "react-toastify";

const DeleteButton = ({
  uuid,
  refetch,
  endpoint,
}: {
  uuid: string;
  refetch?: () => void;
  endpoint: string;
}) => {
  async function handleDelete(uuid: string) {
    try {
      const response = await fetch(`http://localhost:8000/${endpoint}/${uuid}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir registro.");
      }

      toast.success("Registro excluido com sucesso!");

      if (refetch) {
        refetch();
      }
    } catch (err) {
      toast.error((err as Error).message);
    }
  }

  return (
    <button
      onClick={() => handleDelete(uuid)}
      type="button"
      className={styles.deleteButton}
    >
      <MdOutlineDelete className={styles.buttonIcon} />
    </button>
  );
};

export default DeleteButton;
