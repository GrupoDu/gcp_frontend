import styles from "./styles.module.scss";
import React from "react";

type DefaultButtonProps = {
  type: "submit" | "button" | "reset";
  children: React.ReactNode;
  isDisabled?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
};

export const DefaultButton = (props: DefaultButtonProps) => {
  const { children, onClick, type, style, isDisabled, className } = props;

  return (
    <button
      disabled={isDisabled}
      type={type}
      onClick={onClick}
      style={style}
      className={`${styles.defaultButton} ${isDisabled && styles.disabled} ${className}`}
    >
      {children}
    </button>
  );
};
