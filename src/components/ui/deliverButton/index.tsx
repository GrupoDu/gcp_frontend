"use client";

import { useRouter } from "next/navigation";
import styles from "./styles.module.scss";
import { toast } from "react-toastify";

type DeliverButtonProps = {
  children: React.ReactNode;
  bodyValues: Record<string, unknown>;
  endpoint: string;
  redirectHref?: string;
  refetch?: () => void;
  employeeUuid?: string;
};

const DeliverButton = ({
  children,
  bodyValues,
  endpoint,
  redirectHref,
  refetch,
  employeeUuid
}: DeliverButtonProps) => {
  const router = useRouter();

  async function handleDeliver() {
    try {
      const responseUpdateRegister = await fetch(
        `http://localhost:8000/${endpoint}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(bodyValues),
        },
      );
      const data = await responseUpdateRegister.json();
      console.log(data);

      if (redirectHref) {
        router.push(redirectHref);
        return toast.success("Entrega realizada com sucesso!");
      } else if (refetch) {
        refetch();
      }
    } catch (err) {
      return toast.error((err as Error).message);
    }
  }

  async function employeeUpdateActivityQuantity() {
    try {
      const updateEmployeeActivity = await fetch(
        `http://localhost:8000/employees/activity/${employeeUuid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );

      if (!updateEmployeeActivity.ok) {
        throw new Error("Erro ao atualizar quantidade de entregas.");
      }

      const data = await updateEmployeeActivity.json();
      console.log(data);

      return toast.success("Quantidade de entregas atualizada com sucesso!");
    } catch (err) {
      return toast.error((err as Error).message);
    }
  }

  async function deliver() {
    await handleDeliver();
    await employeeUpdateActivityQuantity();
  }

  return (
    <button type="button" onClick={deliver} className={styles.deliverButton}>
      {children}
    </button>
  );
};

export default DeliverButton;
