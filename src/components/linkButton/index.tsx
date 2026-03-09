import { IconType } from "react-icons";
import styles from "./styles.module.scss";
import Link from "next/link";
import React from "react";
import { useLoading } from "@/hooks/useLoading";

type LinkButtonProps = {
  Icon?: IconType;
  children: React.ReactNode;
  href: string;
  color: "black" | "white";
  fullWidth?: boolean;
  textAlign?: "center" | "flex-start";
};

const LinkButton = ({ href, children, Icon, color, fullWidth, textAlign }: LinkButtonProps) => {
  const { setIsLoading } = useLoading();

  return (
    <Link
      href={href}
      onClick={() => setIsLoading(true)}
      style={{
        backgroundColor: color,
        color: color === "black" ? "white" : "black",
        border: color === "black" ? "none" : "1px solid #D4D4D4",
        flex: fullWidth ? 1 : 0,
        width: fullWidth ? "100%" : "fit-content",
        justifyContent: textAlign ? textAlign : "flex-start",
      }}
      className={styles.linkButtonContainer}
    >
      {Icon && <Icon />} {children}
    </Link>
  );
};

export default LinkButton;
