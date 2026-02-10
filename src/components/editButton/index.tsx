import React from "react";
import { FaEdit } from "react-icons/fa";
import styles from "./styles.module.scss";
import Link from "next/link";

const EditButton = ({ href }: { href: string }) => {
  return (
    <Link href={href} type="button" className={styles.editButton}>
      <FaEdit className={styles.buttonIcon} />
    </Link>
  );
};

export default EditButton;
