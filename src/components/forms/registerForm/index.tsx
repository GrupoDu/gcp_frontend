"use client";

import styles from "./styles.module.scss";
import LinkButton from "@/components/linkButton";
import React, { useEffect, useState } from "react";
import { useUsers } from "@/hooks/useUsers";
import { useProducts } from "@/hooks/useProducts";
import { Register } from "@/types/register.type";
import { useRegisters } from "@/hooks/useRegisters";
import { useEmployeeType } from "@/hooks/useEmployeeType";
import { handleFormSubmit } from "@/utils/handleFormSubmit";
import { Product } from "@/types/product.type";
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
  const router = useRouter();
  const { welders, assistants } = useEmployeeType();
  const [fetchedRegisterProduct, setFetchedRegisterProduct] = useState<
    Product | undefined
  >();
  const [registerValues, setRegisterValues] = useState<Register>({
    client_uuid: "",
    product_uuid: "",
    employee_uuid: null,
    cut_assistant: null,
    fold_assistant: null,
    finishing_assistant: null,
    paint_assistant: null,
    product_quantity: 0,
    deadline: "",
    title: "",
    description: "",
    status: "Pendente",
    delivered_at: null,
    deliver_observation: "",
  });

  const clientUsers =
    usersData?.filter((user) => user.user_type === "supervisor") || [];

  useEffect(() => {
    if (isEditPage) {
      const fetchedRegister = registersData?.find(
        (register) => register.register_id === registerId,
      );
      const formattedDeadline = fetchedRegister?.deadline
        ? new Date(fetchedRegister.deadline).toISOString()
        : "";

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFetchedRegisterProduct(
        productsData?.find(
          (product) => product.uuid === fetchedRegister?.product_uuid,
        ),
      );

      setRegisterValues({
        client_uuid: fetchedRegister?.client_uuid || "",
        product_uuid: fetchedRegister?.product_uuid || "",
        employee_uuid: fetchedRegister?.employee_uuid || null,
        cut_assistant: fetchedRegister?.cut_assistant || null,
        fold_assistant: fetchedRegister?.fold_assistant || null,
        finishing_assistant: fetchedRegister?.finishing_assistant || null,
        paint_assistant: fetchedRegister?.paint_assistant || null,
        product_quantity: fetchedRegister?.product_quantity || 0,
        deadline: formattedDeadline,
        title: fetchedRegister?.title || "",
        description: fetchedRegister?.description || "",
        status: fetchedRegister?.status || "",
        delivered_at: fetchedRegister?.delivered_at || null,
        deliver_observation: fetchedRegister?.deliver_observation || "",
        register_id: fetchedRegister?.register_id || "",
      });
    }
  }, [isEditPage, registerId, registersData, productsData]);

  async function handleProductChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setFetchedRegisterProduct(
      productsData?.find((product) => product.uuid === e.target.value),
    );

    setRegisterValues({
      ...registerValues,
      product_uuid: fetchedRegisterProduct?.uuid || "",
    });
  }

  const endpoint = isEditPage ? `registers/${registerId}` : "registers";
  const method = isEditPage ? "PUT" : "POST";
  const formattedUpdatedTitle = `${registerValues.product_quantity} ${fetchedRegisterProduct?.name}`;
  const registerBodyValues = {
    ...registerValues,
    title: formattedUpdatedTitle,
    delivered_at: null,
    product_uuid: fetchedRegisterProduct?.uuid || "",
  };

  return (
    <form
      onSubmit={(e) =>
        handleFormSubmit(
          e,
          method,
          registerBodyValues,
          endpoint,
          "/producao",
          router,
        )
      }
      className={styles.registerForm}
    >
      <div className={styles.registerContent}>
        <label className={styles.deliverDate}>
          <span className={styles.deliverDateLabel}>Data de entrega:</span>
          <input
            onChange={(e) =>
              setRegisterValues({
                ...registerValues,
                deadline: new Date(e.target.value).toISOString(),
              })
            }
            value={registerValues.deadline.split("T")[0]}
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
            readOnly
            placeholder="Digite um título"
            value={`${registerValues.product_quantity} ${fetchedRegisterProduct?.name}`}
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
          <span>Supervisor</span>
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
            value={fetchedRegisterProduct?.uuid}
            onChange={(e) => handleProductChange(e)}
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
            value={registerValues?.employee_uuid as string}
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
            value={registerValues?.cut_assistant as string}
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
            value={registerValues?.paint_assistant as string}
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
            value={registerValues?.fold_assistant as string}
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
            value={registerValues?.finishing_assistant as string}
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
