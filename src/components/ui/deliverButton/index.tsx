"use client";

import { useRouter } from "next/navigation";
import styles from "./styles.module.scss";

type DeliverButtonProps = {
  register_id: string;
  children: React.ReactNode;
  deliver_observation?: string;
};

const DeliverButton = ({
  register_id,
  children,
  deliver_observation,
}: DeliverButtonProps) => {
  const router = useRouter();

  async function deliver(register_id: string) {
    try {
      const response = await fetch(
        `http://localhost:8000/registers/${register_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "Entregue",
            deliver_observation,
            delivered_at: new Date().toISOString(),
          }),
        },
      );
      const data = await response.json();
      console.log(data);

      return router.push("/producao");
    } catch (err) {
      console.log((err as Error).message);
    }
  }

  return (
    <button
      type="button"
      onClick={() => deliver(register_id)}
      className={styles.deliverButton}
    >
      {children}
    </button>
  );
};

export default DeliverButton;
