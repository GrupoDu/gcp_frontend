"use client";

import styles from "./styles.module.scss";
import LinkButton from "@/components/linkButton";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateRegister } from "@/hooks/useCreateRegister";
import { useEmployees } from "@/hooks/useEmployees";
import { useUsers } from "@/hooks/useUsers";
import { useProducts } from "@/hooks/useProducts";
import { Register } from "@/types/register.type";
import { useRegisters } from "@/hooks/useRegisters";
import { useEmployeeType } from "@/hooks/useEmployeeType";

const RegisterForm = ({
  isEditPage,
  registerId,
}: {
  isEditPage: boolean;
  registerId?: string;
}) => {
  if (isEditPage) return <EditRegisterForm registerId={registerId || ""} />;

  return <CreateRegisterForm />;
};

const CreateRegisterForm = () => {
  const { usersContext, productsContext } = useCreateRegister();

  const clientUsers =
    usersContext.usersData?.filter((user) => user.user_type === "cliente") ||
    [];

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

  async function submitRegister(e: FormEvent) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/registers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
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

  return (
    <form onSubmit={(e) => submitRegister(e)} className={styles.registerForm}>
      <div className={styles.registerContent}>
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
      </div>
    </form>
  );
};

const EditRegisterForm = ({ registerId }: { registerId: string }) => {
  const { registersData } = useRegisters();
  const { usersData } = useUsers();
  const { productsData } = useProducts();
  const [registerData, setRegisterData] = useState<Register>();
  const { welders, assistants } = useEmployeeType();
  const [updatedFields, setUpdatedFields] = useState<Register>({
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

  const clientUsers =
    usersData?.filter((user) => user.user_type === "cliente") || [];

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRegisterData(
      registersData?.find((register) => register.register_id === registerId),
    );

    setUpdatedFields({
      client_uuid: registerData?.client_uuid || "",
      product_uuid: registerData?.product_uuid || "",
      employee_uuid: registerData?.employee_uuid || "",
      cut_assistant: registerData?.cut_assistant || "",
      fold_assistant: registerData?.fold_assistant || "",
      finishing_assistant: registerData?.finishing_assistant || "",
      paint_assistant: registerData?.paint_assistant || "",
      product_quantity: registerData?.product_quantity || 0,
      deadline: registerData?.deadline || "",
      title: registerData?.title || "",
      description: registerData?.description || "",
      status: registerData?.status || "",
      delivered_at: registerData?.delivered_at || "",
      deliver_observation: registerData?.deliver_observation || "",
      register_id: registerData?.register_id || "",
    });
  }, [registerId, registersData, registerData]);

  async function submitUpdatedRegister(e: FormEvent) {
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
            ...updatedFields,
            delivered_at: null,
            cut_assistant: updatedFields.cut_assistant
              ? updatedFields.cut_assistant
              : null,
            fold_assistant: updatedFields.fold_assistant
              ? updatedFields.fold_assistant
              : null,
            finishing_assistant: updatedFields.finishing_assistant
              ? updatedFields.finishing_assistant
              : null,
            paint_assistant: updatedFields.paint_assistant
              ? updatedFields.paint_assistant
              : null,
            employee_uuid: updatedFields.employee_uuid
              ? updatedFields.employee_uuid
              : null,
            deadline: new Date(updatedFields.deadline).toISOString(),
          }),
        },
      );
      const updatedRegister = await response.json();
    } catch (err) {
      console.log((err as Error).message);
    }
  }

  return (
    <form
      onSubmit={(e) => submitUpdatedRegister(e)}
      className={styles.registerForm}
    >
      <div className={styles.registerContent}>
        <label className={styles.deliverDate}>
          <span className={styles.deliverDateLabel}>Data de entrega:</span>
          <input
            value={updatedFields.deadline.split("T")[0]}
            onChange={(e) =>
              setRegisterData({ ...updatedFields, deadline: e.target.value })
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
            value={updatedFields.title}
            onChange={(e) =>
              setRegisterData({ ...updatedFields, title: e.target.value })
            }
          />
        </label>
        <label className={styles.descriptionInput}>
          <span>Descrição</span>
          <textarea
            name="description-input"
            placeholder="Digite uma descrição"
            value={updatedFields.description}
            onChange={(e) =>
              setRegisterData({ ...updatedFields, description: e.target.value })
            }
          />
        </label>
        <label className={styles.clientSelect}>
          <span>Cliente</span>
          <select
            value={updatedFields.client_uuid}
            onChange={(e) =>
              setRegisterData({ ...updatedFields, client_uuid: e.target.value })
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
            value={updatedFields.product_uuid}
            onChange={(e) =>
              setRegisterData({
                ...updatedFields,
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
            value={updatedFields.product_quantity}
            onChange={(e) => {
              setRegisterData({
                ...updatedFields,
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
            value={updatedFields?.employee_uuid}
            onChange={(e) =>
              setUpdatedFields({
                ...updatedFields,
                employee_uuid: e.target.value,
              })
            }
            name="employee-select"
          >
            <option value="" selected>
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
            value={updatedFields?.cut_assistant}
            onChange={(e) =>
              setUpdatedFields({
                ...updatedFields,
                cut_assistant: e.target.value,
              })
            }
            name="employee-select"
          >
            <option value="" selected>
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
            value={updatedFields?.paint_assistant}
            onChange={(e) =>
              setUpdatedFields({
                ...updatedFields,
                paint_assistant: e.target.value,
              })
            }
            name="employee-select"
          >
            <option value="" selected>
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
            value={updatedFields?.fold_assistant}
            onChange={(e) =>
              setUpdatedFields({
                ...updatedFields,
                fold_assistant: e.target.value,
              })
            }
            name="employee-select"
          >
            <option value="" selected>
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
            value={updatedFields?.finishing_assistant}
            onChange={(e) =>
              setUpdatedFields({
                ...updatedFields,
                finishing_assistant: e.target.value,
              })
            }
            name="employee-select"
          >
            <option value="" selected>
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
        <button type="submit">Editar</button>
      </div>
    </form>
  );
};

export default RegisterForm;
