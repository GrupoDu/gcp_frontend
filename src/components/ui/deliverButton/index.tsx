"use client";

import styles from "./styles.module.scss";

type DeliverButtonProps = {
  children: React.ReactNode;
  isProcessing: boolean;
};

const DeliverButton = ({ children, isProcessing }: DeliverButtonProps) => {
  return (
    <button
      type="submit"
      className={`${styles.deliverButton} ${isProcessing && styles.processing}`}
      disabled={isProcessing}
    >
      {children}
    </button>
  );
};

export default DeliverButton;
