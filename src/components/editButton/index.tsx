import React from "react";
import { FaEdit } from "react-icons/fa";
import styles from "./styles.module.scss";

const EditButton = () => {
  return (
    <button type="button" className={styles.editButton}>
      <FaEdit className={styles.buttonIcon} />
    </button>
  );
};

export default EditButton;
