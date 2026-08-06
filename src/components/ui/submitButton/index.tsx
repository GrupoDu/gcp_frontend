"use client";

import React from "react";
import styles from "./styles.module.scss";
import { useLoading } from "@/hooks/useLoading";

const SubmitButton = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useLoading();

  return (
    <button
      className={`${styles.submitButtonContainer} ${isLoading ? styles.processing : ""}`}
      type="submit"
      disabled={isLoading}
    >
      {children}
    </button>
  );
};

export default SubmitButton;
