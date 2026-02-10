"use client";

import styles from "./styles.module.scss";
import LinkButton from "@/components/linkButton";
import React, { useEffect, useState } from "react";
import { useUsers } from "@/hooks/useUsers";
import { useProducts } from "@/hooks/useProducts";
import { Register } from "@/types/register.type";
import { useRegisters } from "@/hooks/useRegisters";
import { useEmployeeType } from "@/hooks/useEmployeeType";
import { useRouter } from "next/navigation";

const RegisterForm = ({
  isEditPage,
  registerId,
}: {
  isEditPage: boolean;
  registerId?: string;
}) => {
  const { registersData } = useRegisters();
  const { usersData } = useUsers();
  const { productsData } = useProducts();
  const { welders, assistants } = useEmployeeType();
  const [fetchedRegister, setFetchedRegister] = useState<Register | undefined>(
    undefined,
  );
  const [registerValues, setRegisterValues] = useState<Register>({
    client_uuid: "",
    product_uuid: "",
    employee_uuid: "",
    cut_assistant: "",
    fold_assistant: "",
    finishing_assistant: "",
    paint_assistant: "",
    product_quantity: 0,
    deadline: "",
    title: "",
    description: "",
    status: "",
    delivered_at: "",
    deliver_observation: "",
    register_id: "",
  });
  const router = useRouter();

  const clientUsers =
    usersData?.filter((user) => user.user_type === "cliente") || [];

  useEffect(() => {
    if (isEditPage) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFetchedRegister(
        registersData?.find((register) => register.register_id === registerId),
      );

      // Formata a data para o input type="date"
      const formattedDeadline = fetchedRegister?.deadline
        ? new Date(fetchedRegister.deadline).toISOString().split("T")[0]
        : "";

      setRegisterValues({
        client_uuid: fetchedRegister?.client_uuid || "",
        product_uuid: fetchedRegister?.product_uuid || "",
        employee_uuid: fetchedRegister?.employee_uuid || "",
        cut_assistant: fetchedRegister?.cut_assistant || "",
        fold_assistant: fetchedRegister?.fold_assistant || "",
        finishing_assistant: fetchedRegister?.finishing_assistant || "",
        paint_assistant: fetchedRegister?.paint_assistant || "",
        product_quantity: fetchedRegister?.product_quantity || 0,
        deadline: formattedDeadline,
        title: fetchedRegister?.title || "",
        description: fetchedRegister?.description || "",
        status: fetchedRegister?.status || "",
        delivered_at: fetchedRegister?.delivered_at || "",
        deliver_observation: fetchedRegister?.deliver_observation || "",
        register_id: fetchedRegister?.register_id || "",
      });
    }
  }, [isEditPage, registerId, registersData]);

  async function submitUpdatedRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8000/registers/${registerId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            ...registerValues,
            delivered_at: null,
            cut_assistant: registerValues.cut_assistant
              ? registerValues.cut_assistant
              : null,
            fold_assistant: registerValues.fold_assistant
              ? registerValues.fold_assistant
              : null,
            finishing_assistant: registerValues.finishing_assistant
              ? registerValues.finishing_assistant
              : null,
            paint_assistant: registerValues.paint_assistant
              ? registerValues.paint_assistant
              : null,
            employee_uuid: registerValues.employee_uuid
              ? registerValues.employee_uuid
              : null,
            deadline: new Date(registerValues.deadline).toISOString(),
          }),
        },
      );
      await response.json();
      return router.push("/producao");
    } catch (err) {
      console.log((err as Error).message);
    }
  }

  async function createRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/registers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(registerValues),
      });
      await response.json();
    } catch (err) {
      console.log((err as Error).message);
    }
  }

  return (
    <form
      onSubmit={(e) =>
        isEditPage ? submitUpdatedRegister(e) : createRegister(e)
      }
      className={styles.registerForm}
    >
      <div className={styles.registerContent}>
        <label className={styles.deliverDate}>
          <span className={styles.deliverDateLabel}>Data de entrega:</span>
          <input
            onChange={(e) =>
              setRegisterValues({ ...registerValues, deadline: e.target.value })
            }
            value={registerValues.deadline}
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
            value={registerValues.title}
            onChange={(e) =>
              setRegisterValues({ ...registerValues, title: e.target.value })
            }
          />
        </label>
        <label className={styles.descriptionInput}>
          <span>Descrição</span>
          <textarea
            name="description-input"
            placeholder="Digite uma descrição"
            value={registerValues.description}
            onChange={(e) =>
              setRegisterValues({
                ...registerValues,
                description: e.target.value,
              })
            }
          />
        </label>
        <label className={styles.clientSelect}>
          <span>Cliente</span>
          <select
            value={registerValues.client_uuid}
            onChange={(e) =>
              setRegisterValues({
                ...registerValues,
                client_uuid: e.target.value,
              })
            }
            name="client-select"
            required
          >
            <option value="" defaultValue={""} disabled>
              Nenhum
            </option>
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
            value={registerValues.product_uuid}
            onChange={(e) =>
              setRegisterValues({
                ...registerValues,
                product_uuid: e.target.value,
              })
            }
            required
          >
            <option value="">Nenhum</option>
            {productsData?.map((product) => (
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
            value={registerValues.product_quantity}
            onChange={(e) => {
              setRegisterValues({
                ...registerValues,
                product_quantity: parseInt(e.target.value),
              });
            }}
            name="quantity-input"
            placeholder="Digite uma quantidade"
            required
          />
        </label>
      </div>
      <div className={styles.employeesSection}>
        <label className={styles.employee}>
          <span>Soldador</span>
          <select
            value={registerValues?.employee_uuid}
            onChange={(e) =>
              setRegisterValues({
                ...registerValues,
                employee_uuid: e.target.value,
              })
            }
            name="employee-select"
          >
            <option value="" defaultValue={""}>
              Não definido
            </option>
            {welders?.map((welder) => (
              <option key={welder.employee_id} value={welder.employee_id}>
                {welder.name}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.cutAssitant}>
          <span>Corte</span>
          <select
            value={registerValues?.cut_assistant}
            onChange={(e) =>
              setRegisterValues({
                ...registerValues,
                cut_assistant: e.target.value,
              })
            }
            name="employee-select"
          >
            <option value="" defaultValue={""}>
              Não definido
            </option>
            {assistants?.map((assistant) => (
              <option key={assistant.employee_id} value={assistant.employee_id}>
                {assistant.name}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.paintAssitant}>
          <span>Pintura</span>
          <select
            value={registerValues?.paint_assistant}
            onChange={(e) =>
              setRegisterValues({
                ...registerValues,
                paint_assistant: e.target.value,
              })
            }
            name="employee-select"
          >
            <option value="" defaultValue={""}>
              Não definido
            </option>
            {assistants?.map((assistant) => (
              <option key={assistant.employee_id} value={assistant.employee_id}>
                {assistant.name}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.foldAssitant}>
          <span>Dobra</span>
          <select
            value={registerValues?.fold_assistant}
            onChange={(e) =>
              setRegisterValues({
                ...registerValues,
                fold_assistant: e.target.value,
              })
            }
            name="employee-select"
          >
            <option value="" defaultValue={""}>
              Não definido
            </option>
            {assistants?.map((assistant) => (
              <option key={assistant.employee_id} value={assistant.employee_id}>
                {assistant.name}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.finishAssitant}>
          <span>Acabamento</span>
          <select
            value={registerValues?.finishing_assistant}
            onChange={(e) =>
              setRegisterValues({
                ...registerValues,
                finishing_assistant: e.target.value,
              })
            }
            name="employee-select"
          >
            <option value="" defaultValue={""}>
              Não definido
            </option>
            {assistants?.map((assistant) => (
              <option key={assistant.employee_id} value={assistant.employee_id}>
                {assistant.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className={styles.buttons}>
        <LinkButton color="black" href="/producao">
          Cancelar
        </LinkButton>
        <button type="submit">{isEditPage ? "Editar" : "Criar"}</button>
      </div>
    </form>
  );
};

export default RegisterForm;
