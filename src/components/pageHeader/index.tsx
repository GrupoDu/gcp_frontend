import styles from "./styles.module.scss";
import { IconType } from "react-icons";
import { FaRegUserCircle } from "react-icons/fa";

type pageHeaderProps = {
  HeaderIcon: IconType;
  headerTitle: string;
};

const PageHeader = ({ HeaderIcon, headerTitle }: pageHeaderProps) => {
  return (
    <header className={styles.pageHeaderContainer}>
      <HeaderIcon className={styles.headerIcon} />
      <h1>{headerTitle}</h1>
      <FaRegUserCircle className={styles.headerIcon} />
    </header>
  );
};

export default PageHeader;
