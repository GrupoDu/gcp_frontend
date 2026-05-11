"use client";

import styles from "./styles.module.scss";
import LinkButton from "@/components/linkButton";
import React, { useEffect, useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { ProductionOrder } from "@/types/productionOrder.type";
import { useProductionOrders } from "@/hooks/useProductionOrder";
import { useEmployeeRole } from "@/hooks/useEmployeeRole";
import { handleFormSubmit } from "@/utils/handleFormSubmit";
import { Product } from "@/types/product.type";
import { useRouter } from "next/navigation";
import SubmitButton from "@/components/ui/submitButton";
import { useSupervisor } from "@/hooks/useSupervisors";

/**
 * Componente de formulário de produção
 *
 * @param isEdit - Indica se o formulário está em modo de edição
 * @param productionOrderId - ID da produção
 */
const ProductionOrderForm = ({ isEdit, productionOrderId }: { isEdit: boolean; productionOrderId?: string }) => {
  const { allProductionOrders } = useProductionOrders();
  const { supervisorsData } = useSupervisor();
  const [canEdit, setCanEdit] = useState(false);
  const { productsData } = useProducts();
  const router = useRouter();
  const { welders } = useEmployeeRole();
  const [fetchedRegisterProduct, setFetchedRegisterProduct] = useState<Product | undefined>();
  const [productionOrderValues, setProductionOrderValues] = useState<ProductionOrder>({
    supervisor_uuid: "",
    product_uuid: "",
    welder_uuid: null,
    quantity_to_produce: 0,
    produced_quantity: 0,
    production_order_deadline: new Date(),
    production_order_description: "",
    production_order_status: "Pendente",
    delivered_at: null,
    delivery_observation: "",
    stock_validation: false,
  });

  useEffect(() => {
    if (isEdit) {
      const foundOrder = allProductionOrders?.find((order) => order.production_order_uuid === productionOrderId);

      const formattedDeadline = foundOrder?.production_order_deadline
        ? new Date(foundOrder.production_order_deadline)
        : new Date();

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFetchedRegisterProduct(productsData?.find((product) => product.product_uuid === foundOrder?.product_uuid));

      setProductionOrderValues({
        supervisor_uuid: foundOrder?.supervisor_uuid || "",
        product_uuid: foundOrder?.product_uuid || "",
        welder_uuid: foundOrder?.welder_uuid || null,
        quantity_to_produce: foundOrder?.quantity_to_produce || 0,
        produced_quantity: foundOrder?.produced_quantity || 0,
        production_order_deadline: formattedDeadline,
        production_order_description: foundOrder?.production_order_description || "",
        production_order_status: foundOrder?.production_order_status || "",
        delivered_at: foundOrder?.delivered_at || null,
        delivery_observation: foundOrder?.delivery_observation || "",
        production_order_uuid: foundOrder?.production_order_uuid || "",
        stock_validation: foundOrder?.stock_validation || false,
      });

      setCanEdit(foundOrder?.production_order_status === "Pendente");
    } else {
      setCanEdit(true);
    }
  }, [isEdit, productionOrderId, allProductionOrders, productsData]);

  /** Lida com a mudança do produto
   * @param e - Evento de mudança do select
   */
  async function handleProductChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedProduct = productsData?.find((product) => product.product_uuid === e.target.value);
    setFetchedRegisterProduct(selectedProduct);

    setProductionOrderValues({
      ...productionOrderValues,
      product_uuid: e.target.value,
    });
  }

  const endpoint = isEdit ? `production-orders/${productionOrderId}` : "production-orders";
  const method = isEdit ? "PUT" : "POST";
  const productionOrderBodyValues = {
    ...productionOrderValues,
    delivered_at: null,
    welder_uuid: productionOrderValues.welder_uuid || null,
  };

  return (
    <form
      onSubmit={(e) =>
        handleFormSubmit(e, { endpoint, method, bodyValues: productionOrderBodyValues }, { canEdit, router })
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
                production_order_deadline: new Date(e.target.value),
              })
            }
            value={productionOrderValues.production_order_deadline.toISOString().split("T")[0]}
            type="date"
            required
            name="deliver-date"
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
            value={productionOrderValues.supervisor_uuid}
            onChange={(e) =>
              setProductionOrderValues({
                ...productionOrderValues,
                supervisor_uuid: e.target.value,
              })
            }
            name="client-select"
            required
          >
            <option value="" defaultValue={""} disabled>
              Nenhum
            </option>
            {supervisorsData?.map((user) => (
              <option key={user.user_uuid} value={user.user_uuid}>
                {user.name}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.productSelect}>
          <span>Produto</span>
          <select
            name="product-select"
            value={fetchedRegisterProduct?.product_uuid}
            onChange={(e) => handleProductChange(e)}
            required
          >
            <option value="">Nenhum</option>
            {productsData?.map((product) => (
              <option key={product.product_uuid} value={product.product_uuid}>
                {product.name}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.quantityInput}>
          <span>Quantidade</span>
          <input
            type="number"
            value={productionOrderValues.quantity_to_produce}
            onChange={(e) => {
              setProductionOrderValues({
                ...productionOrderValues,
                quantity_to_produce: parseInt(e.target.value),
              });
            }}
            name="quantity-input"
            placeholder="Digite uma quantidade"
            min={0}
            required
          />
        </label>
      </div>
      <div style={{}} className={styles.employeesSection}>
        <label className={styles.employee}>
          <span>Soldador</span>
          <select
            value={productionOrderValues?.welder_uuid as string}
            onChange={(e) =>
              setProductionOrderValues({
                ...productionOrderValues,
                welder_uuid: e.target.value,
              })
            }
            name="employee-select"
          >
            <option value="" defaultValue={""}>
              Não definido
            </option>
            {welders?.map((welder) => (
              <option key={welder.employee_uuid} value={welder.employee_uuid}>
                {welder.name}
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
