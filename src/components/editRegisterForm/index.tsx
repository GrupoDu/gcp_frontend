"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useRegisters } from "@/hooks/useRegisters";
import { Register } from "@/types/register.type";
import { useUsers } from "@/hooks/useUsers";

const EditRegisterForm = ({ registerId }: { registerId: string }) => {
  const { registersData } = useRegisters();
  const { usersData } = useUsers();
  const [registerData, setRegisterData] = useState<Register>();
  const [newTitle, setNewTitle] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRegisterData(
      registersData?.find((register) => register.register_id === registerId),
    );

    setNewTitle(registerData?.title || "");
    setNewDescription(registerData?.description || "");
  }, [registerId, registersData, registerData]);

  return (
    <form className={styles.editRegisterContainer}>
      <label>
        <span>Data de entrega</span>
        <input type="date" />
      </label>
      <label>
        <span>Título</span>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
      </label>
      <label>
        <span>Descrição</span>
        <input
          type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
      </label>
      <label>
        <span>Cliente</span>
        <select name="client-select">
          <option value="">Nenhum</option>
          {usersData
            ?.filter((user) => user.user_type === "cliente")
            .map((client) => (
              <option key={client.user_id} value={client.user_id}>
                {client.name}
              </option>
            ))}
        </select>
      </label>
    </form>
  );
};

export default EditRegisterForm;
