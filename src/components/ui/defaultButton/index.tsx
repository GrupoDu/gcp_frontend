import styles from "./styles.module.scss";
import React from "react";

type DefaultButtonProps = {
  type: "submit" | "button" | "reset";
  children: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
};

export const DefaultButton = (props: DefaultButtonProps) => {
  const { children, onClick, type, style } = props;

  return (
    <button type={type} onClick={onClick} style={style} className={styles.defaultButton}>
      {children}
    </button>
  );
};
