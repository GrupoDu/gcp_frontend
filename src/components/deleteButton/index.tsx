"use client";

import React from "react";
import styles from "./styles.module.scss";
import { MdOutlineDelete } from "react-icons/md";

type DeleteButtonProps = {
  deleteAction?: React.MouseEventHandler<HTMLButtonElement>;
};

const DeleteButton = ({ deleteAction }: DeleteButtonProps) => {
  return (
    <button onClick={deleteAction} type="button" className={styles.deleteButton}>
      <MdOutlineDelete className={styles.buttonIcon} />
      <span>Remover</span>
    </button>
  );
};

export default DeleteButton;
