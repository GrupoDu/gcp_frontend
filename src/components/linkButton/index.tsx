import { IconType } from "react-icons";
import styles from "./styles.module.scss";
import Link from "next/link";
import React from "react";

type LinkButtonProps = {
  Icon?: IconType;
  children: React.ReactNode;
  href: string;
  color: "black" | "white";
  fullWidth?: boolean;
};

const LinkButton = ({
  href,
  children,
  Icon,
  color,
  fullWidth,
}: LinkButtonProps) => {
  return (
    <Link
      href={href}
      style={{
        backgroundColor: color,
        color: color === "black" ? "white" : "black",
        border: color === "black" ? "none" : "1px solid #D4D4D4",
        flex: fullWidth ? 1 : 0,
        width: fullWidth ? "100%" : "fit-content",
      }}
      className={styles.linkButtonContainer}
    >
      {Icon && <Icon />} {children}
    </Link>
  );
};

export default LinkButton;
