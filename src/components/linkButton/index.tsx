import { IconType } from "react-icons";
import styles from "./styles.module.scss";
import Link from "next/link";

type LinkButtonProps = {
  Icon?: IconType;
  placeholder: string;
  href: string;
};

const LinkButton = ({ href, placeholder, Icon }: LinkButtonProps) => {
  return (
    <Link href={href} className={styles.linkButtonContainer}>
      {Icon && <Icon />} {placeholder}
    </Link>
  );
};

export default LinkButton;
