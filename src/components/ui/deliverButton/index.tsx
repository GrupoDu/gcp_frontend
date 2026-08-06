"use client";

import styles from "./styles.module.scss";
import { useLoading } from "@/hooks/useLoading";

type DeliverButtonProps = {
  children: React.ReactNode;
};

const DeliverButton = ({ children }: DeliverButtonProps) => {
  const { isLoading } = useLoading();

  return (
    <button type="submit" className={`${styles.deliverButton} ${isLoading && styles.processing}`} disabled={isLoading}>
      {children}
    </button>
  );
};

export default DeliverButton;
