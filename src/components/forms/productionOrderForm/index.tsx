"use client";

import styles from "./styles.module.scss";
import LinkButton from "@/components/linkButton";
import React, { useEffect, useMemo, useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { ProductionOrder } from "@/types/productionOrder.type";
import { useProductionOrders } from "@/hooks/useProductionOrder";
import { useEmployeeType } from "@/hooks/useEmployeeType";
import { handleFormSubmit } from "@/utils/handleFormSubmit";
import { Product } from "@/types/product.type";
import { usePathname, useRouter } from "next/navigation";
import SubmitButton from "@/components/ui/submitButton";
import { useSupervisor } from "@/hooks/useSupervisors";
import { AssistantsPORegisters } from "@/types/assistantsPORegister.type";
import { debugLogger } from "@/utils/logger";

const ProductionOrderForm = ({ isEdit, productionOrderId }: { isEdit: boolean; productionOrderId?: string }) => {
  const { allProductionOrders } = useProductionOrders();
  const { supervisorsData } = useSupervisor();
  const [canEdit, setCanEdit] = useState(false);
  const [fetchedProductionOrder, setFetchedProductionOrder] = useState<ProductionOrder | undefined>();
  const { productsData } = useProducts();
  const router = useRouter();
  const { welders, assistants } = useEmployeeType();
  const [fetchedRegisterProduct, setFetchedRegisterProduct] = useState<Product | undefined>();
  const [assistantsRegisters, setAssistantsRegisters] = useState<AssistantsPORegisters[]>([]);
  const [productionOrderValues, setProductionOrderValues] = useState<ProductionOrder>({
    client_uuid: "",
    product_uuid: "",
    employee_uuid: null,
    cut_assistant: null,
    fold_assistant: null,
    finishing_assistant: null,
    paint_assistant: null,
    product_quantity: 0,
    production_order_deadline: "",
    production_order_title: "",
    production_order_description: "",
    production_order_status: "Pendente",
    delivered_at: null,
    delivery_observation: "",
  });

  useEffect(() => {
    if (isEdit) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFetchedProductionOrder(allProductionOrders?.find((order) => order.production_order_id === productionOrderId));

      const formattedDeadline = fetchedProductionOrder?.production_order_deadline
        ? new Date(fetchedProductionOrder.production_order_deadline).toISOString()
        : "";

      setFetchedRegisterProduct(productsData?.find((product) => product.uuid === fetchedProductionOrder?.product_uuid));

      setProductionOrderValues({
        client_uuid: fetchedProductionOrder?.client_uuid || "",
        product_uuid: fetchedProductionOrder?.product_uuid || "",
        employee_uuid: fetchedProductionOrder?.employee_uuid || null,
        cut_assistant: fetchedProductionOrder?.cut_assistant || null,
        fold_assistant: fetchedProductionOrder?.fold_assistant || null,
        finishing_assistant: fetchedProductionOrder?.finishing_assistant || null,
        paint_assistant: fetchedProductionOrder?.paint_assistant || null,
        product_quantity: fetchedProductionOrder?.product_quantity || 0,
        production_order_deadline: formattedDeadline,
        production_order_title: fetchedProductionOrder?.production_order_title || "",
        production_order_description: fetchedProductionOrder?.production_order_description || "",
        production_order_status: fetchedProductionOrder?.production_order_status || "",
        delivered_at: fetchedProductionOrder?.delivered_at || null,
        delivery_observation: fetchedProductionOrder?.delivery_observation || "",
        production_order_id: fetchedProductionOrder?.production_order_id || "",
      });
      setCanEdit(fetchedProductionOrder?.production_order_status === "Pendente");
    } else {
      setCanEdit(true);
    }
  }, [isEdit, productionOrderId, allProductionOrders, productsData, fetchedProductionOrder]);

  function getAssistentValues(e: React.ChangeEvent<HTMLSelectElement>, assistant_as: string) {
    if (!e.target.value || e.target.value === "") return;
    setAssistantsRegisters((prev) => [...prev, { assistant_uuid: e.target.value, assistant_as }]);
  }

  const handleFormattedTitle = useMemo(() => {
    const isFieldsFilled =
      productionOrderValues.product_quantity !== 0 &&
      fetchedRegisterProduct?.name !== "" &&
      !Number.isNaN(productionOrderValues.product_quantity) &&
      fetchedRegisterProduct !== undefined;

    return isFieldsFilled
      ? `${productionOrderValues.product_quantity} ${fetchedRegisterProduct?.name}`
      : "Preencha a quantidade e o produto";
  }, [productionOrderValues.product_quantity, fetchedRegisterProduct]);

  async function handleProductChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setFetchedRegisterProduct(productsData?.find((product) => product.uuid === e.target.value));

    setProductionOrderValues({
      ...productionOrderValues,
      product_uuid: fetchedRegisterProduct?.uuid || "",
    });
  }

  const endpoint = isEdit ? `productionOrder/${productionOrderId}` : "productionOrder";
  const method = isEdit ? "PUT" : "POST";
  const formattedUpdatedTitle = handleFormattedTitle;
  const productionOrderBodyValues = {
    ...productionOrderValues,
    production_order_title: formattedUpdatedTitle,
    delivered_at: null,
    product_uuid: fetchedRegisterProduct?.uuid || "",
  };

  return (
    <form
      onSubmit={(e) =>
        handleFormSubmit(
          e,
          { endpoint, method, bodyValues: productionOrderBodyValues, assistantsRegister: assistantsRegisters },
          { canEdit, router },
        )
      }
      className={styles.registerForm}
    >
      <div className={styles.registerContent}>
        <label className={styles.deliverDate}>
          <span className={styles.deliverDateLabel}>Data de entrega:</span>
          <input
            onChange={(e) =>
              setProductionOrderValues({
                ...productionOrderValues,
                production_order_deadline: new Date(e.target.value).toISOString(),
              })
            }
            value={productionOrderValues.production_order_deadline.split("T")[0]}
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
            value={handleFormattedTitle}
          />
        </label>
        <label className={styles.descriptionInput}>
          <span>Descrição</span>
          <textarea
            name="description-input"
            placeholder="Digite uma descrição"
            value={productionOrderValues.production_order_description}
            onChange={(e) =>
              setProductionOrderValues({
                ...productionOrderValues,
                production_order_description: e.target.value,
              })
            }
          />
        </label>
        <label className={styles.clientSelect}>
          <span>Supervisor</span>
          <select
            value={productionOrderValues.client_uuid}
            onChange={(e) =>
              setProductionOrderValues({
                ...productionOrderValues,
                client_uuid: e.target.value,
              })
            }
            name="client-select"
            required
          >
            <option value="" defaultValue={""} disabled>
              Nenhum
            </option>
            {supervisorsData?.map((user) => (
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
            value={productionOrderValues.product_quantity}
            onChange={(e) => {
              setProductionOrderValues({
                ...productionOrderValues,
                product_quantity: parseInt(e.target.value),
              });
            }}
            name="quantity-input"
            placeholder="Digite uma quantidade"
            min={0}
            required
          />
        </label>
      </div>
      <div className={styles.employeesSection}>
        <label className={styles.employee}>
          <span>Soldador</span>
          <select
            value={productionOrderValues?.employee_uuid as string}
            onChange={(e) =>
              setProductionOrderValues({
                ...productionOrderValues,
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
            value={productionOrderValues?.cut_assistant as string}
            onChange={(e) => {
              getAssistentValues(e, "Corte");
              setProductionOrderValues({ ...productionOrderValues, cut_assistant: e.target.value });
            }}
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
            value={productionOrderValues?.paint_assistant as string}
            onChange={(e) => {
              getAssistentValues(e, "Pintura");
              setProductionOrderValues({ ...productionOrderValues, paint_assistant: e.target.value });
            }}
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
            value={productionOrderValues?.fold_assistant as string}
            onChange={(e) => {
              getAssistentValues(e, "Dobra");
              setProductionOrderValues({ ...productionOrderValues, fold_assistant: e.target.value });
            }}
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
            value={productionOrderValues?.finishing_assistant as string}
            onChange={(e) => {
              getAssistentValues(e, "Acabamento");
              setProductionOrderValues({ ...productionOrderValues, finishing_assistant: e.target.value });
            }}
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
        <SubmitButton canEdit={canEdit}>{isEdit ? "Salvar" : "Criar"}</SubmitButton>
      </div>
    </form>
  );
};

export default ProductionOrderForm;
