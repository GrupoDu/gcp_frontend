import styles from "./styles.module.scss";
import { IconType } from "react-icons";
import Link from "next/link";

type MenuOptionsProps = {
  MenuIcon: IconType;
  menuTitle: string;
  isSelected: boolean;
  href: string;
  onClick?: () => void;
};

const MenuOption = ({
  MenuIcon,
  menuTitle,
  isSelected,
  href,
  onClick,
}: MenuOptionsProps) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${styles.menuOptionContainer} ${isSelected && styles.selected}`}
    >
      <MenuIcon
        className={`${styles.menuIcon} ${isSelected && styles.selected}`}
      />
      <h4 className={`${isSelected && styles.selected}`}>{menuTitle}</h4>
    </Link>
  );
};

export default MenuOption;
