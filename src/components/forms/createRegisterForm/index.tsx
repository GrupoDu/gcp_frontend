"use client";

import { authToken, useFetch } from "@/hooks/useFetch";
import styles from "./styles.module.scss";
import LinkButton from "@/components/linkButton";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateRegister } from "@/hooks/useCreateRegister";

const CreateRegisterForm = () => {
  const { usersContext, productsContext } = useCreateRegister();

  const [registerData, setRegisterData] = useState({
    title: "",
    client: "",
    product: "",
    quantity: "1",
    description: "",
    deadline: "",
    observation: "",
  });
  const router = useRouter();

  const clientUsers =
    usersContext.usersData?.filter((user) => user.user_type === "cliente") ||
    [];

  async function submitRegister(e: FormEvent) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/registers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          title: registerData.title,
          deadline: new Date(registerData.deadline).toISOString(),
          product_quantity: registerData.quantity,
          cut_assistant: null,
          fold_assistant: null,
          finishing_assistant: null,
          paint_assistant: null,
          employee_uuid: null,
          product_uuid: registerData.product,
          client_uuid: registerData.client,
          description: registerData.description,
        }),
      });
      await response.json();

      return router.push("/producao");
    } catch (err) {
      console.log((err as Error).message);
    }
  }

  useEffect(() => {
    console.log(registerData);
  }, [registerData]);

  return (
    <form
      onSubmit={(e) => submitRegister(e)}
      className={styles.createRegisterForm}
    >
      <label className={styles.deliverDate}>
        <span className={styles.deliverDateLabel}>Data de entrega:</span>
        <input
          value={registerData.deadline}
          onChange={(e) =>
            setRegisterData({ ...registerData, deadline: e.target.value })
          }
          type="date"
          required
          name="deliver-date"
        />
      </label>
      <label className={styles.titleInput}>
        <span>Título</span>
        <input
          type="text"
          name="title-input"
          required
          placeholder="Digite um título"
          value={registerData.title}
          onChange={(e) =>
            setRegisterData({ ...registerData, title: e.target.value })
          }
        />
      </label>
      <label className={styles.descriptionInput}>
        <span>Descrição</span>
        <textarea
          name="description-input"
          placeholder="Digite uma descrição"
          value={registerData.description}
          onChange={(e) =>
            setRegisterData({ ...registerData, description: e.target.value })
          }
        />
      </label>
      <label className={styles.clientSelect}>
        <span>Cliente</span>
        <select
          value={registerData.client}
          onChange={(e) =>
            setRegisterData({ ...registerData, client: e.target.value })
          }
          name="client-select"
          required
        >
          <option value="">Nenhum</option>
          {clientUsers?.map((user) => (
            <option key={user.user_id} value={user.user_id}>
              {user.name}
            </option>
          ))}
        </select>
      </label>
      <label className={styles.productSelect}>
        <span>Produto</span>
        <select
          name="product-select"
          value={registerData.product}
          onChange={(e) =>
            setRegisterData({ ...registerData, product: e.target.value })
          }
          required
        >
          <option value="">Nenhum</option>
          {productsContext.productsData?.map((product) => (
            <option key={product.uuid} value={product.uuid}>
              {product.name}
            </option>
          ))}
        </select>
      </label>
      <label className={styles.quantityInput}>
        <span>Quantidade</span>
        <input
          type="number"
          value={registerData.quantity}
          onChange={(e) => {
            setRegisterData({ ...registerData, quantity: e.target.value });
          }}
          name="quantity-input"
          placeholder="Digite uma quantidade"
          required
        />
      </label>
      <div className={styles.buttons}>
        <LinkButton color="black" href="/producao">
          Cancelar
        </LinkButton>
        <button type="submit">Criar</button>
      </div>
    </form>
  );
};

export default CreateRegisterForm;
