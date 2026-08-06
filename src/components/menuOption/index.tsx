"use client";

import styles from "./styles.module.scss";
import { IconType } from "react-icons";
import Link from "next/link";
import { useLoading } from "@/hooks/useLoading";

type MenuOptionsProps = {
  MenuIcon: IconType;
  menuTitle: string;
  isSelected: boolean;
  href: string;
  onClick?: () => void;
};

const MenuOption = ({ MenuIcon, menuTitle, isSelected, href, onClick }: MenuOptionsProps) => {
  const { setIsLoading } = useLoading();

  const handleClick = () => {
    if (!isSelected) setIsLoading(true);

    onClick?.();
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`${styles.menuOptionContainer} ${isSelected && styles.selected}`}
    >
      <MenuIcon className={`${styles.menuIcon} ${isSelected && styles.selected}`} />
      <h4 className={`${isSelected && styles.selected}`}>{menuTitle}</h4>
    </Link>
  );
};

export default MenuOption;
