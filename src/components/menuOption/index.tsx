"use client";

import styles from "./styles.module.scss";
import { IconType } from "react-icons";

type MenuOptionsProps = {
  MenuIcon: IconType;
  menuTitle: string;
  isSelected: boolean;
};

const MenuOption = ({ MenuIcon, menuTitle, isSelected }: MenuOptionsProps) => {
  return (
    <div
      className={`${styles.menuOptionContainer} ${isSelected && styles.selected}`}
    >
      <MenuIcon
        className={`${styles.menuIcon} ${isSelected && styles.selected}`}
      />
      <h4 className={`${isSelected && styles.selected}`}>{menuTitle}</h4>
    </div>
  );
};

export default MenuOption;
