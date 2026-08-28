"use client";

import React from "react";
import styles from "./styles.module.scss";
import { MdOutlineDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { api } from "@/services/api";
import { useLoading } from "@/hooks/useLoading";

async function handleUserDeactivation(setIsLoading: (isLoading: boolean) => void, uuid: string, refetch?: () => void) {
  setIsLoading(true);
  try {
    await api.delete(`user/deactivate/${uuid}`);

    toast.success("Registro excluido com sucesso!");

    if (refetch) refetch();
  } catch (e) {
    const err = e as Error;
    toast.error(err.message);
  }
}

async function handleDelete(
  uuid: string,
  setIsLoading: (value: boolean) => void,
  endpoint: string,
  refetch?: () => void,
) {
  setIsLoading(true);

  if (endpoint === "user") {
    await handleUserDeactivation(setIsLoading, uuid);
    return;
  }

  try {
    await api.delete(`${endpoint}/${uuid}`);

    toast.success("Registro excluido com sucesso!");

    if (refetch) refetch();
  } catch (err) {
    toast.error((err as Error).message);
  } finally {
    setIsLoading(false);
  }
}

type DeleteButtonProps = {
  uuid: string;
  endpoint: string;
  refetch?: () => void;
};

const DeleteButton = ({ uuid, refetch, endpoint }: DeleteButtonProps) => {
  const { setIsLoading } = useLoading();

  return (
    <button
      onClick={() => handleDelete(uuid, setIsLoading, endpoint, refetch)}
      type="button"
      className={styles.deleteButton}
    >
      <MdOutlineDelete className={styles.buttonIcon} />
      <span>Remover</span>
    </button>
  );
};

export default DeleteButton;
