"use client";

import { useRouter } from "next/navigation";
import styles from "./styles.module.scss";

type DeliverButtonProps = {
  children: React.ReactNode;
  bodyValues: Record<string, unknown>;
  endpoint: string;
  redirectHref?: string;
  refetch?: () => void;
};

const DeliverButton = ({
  children,
  bodyValues,
  endpoint,
  redirectHref,
  refetch,
}: DeliverButtonProps) => {
  const router = useRouter();

  async function deliver() {
    try {
      const response = await fetch(`http://localhost:8000/${endpoint}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(bodyValues),
      });
      const data = await response.json();
      console.log(data);

      if (redirectHref) {
        return router.push(redirectHref);
      } else if (refetch) {
        refetch();
      }
    } catch (err) {
      console.log((err as Error).message);
    }
  }

  return (
    <button type="button" onClick={deliver} className={styles.deliverButton}>
      {children}
    </button>
  );
};

export default DeliverButton;
