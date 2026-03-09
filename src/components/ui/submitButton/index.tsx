import React from "react";
import styles from "./styles.module.scss";

const SubmitButton = ({ canEdit, children }: { canEdit: boolean; children: React.ReactNode }) => {
  return (
    <button
      className={styles.submitButtonContainer}
      type="submit"
      style={{ cursor: canEdit ? "pointer" : "not-allowed" }}
      disabled={!canEdit}
    >
      {children}
    </button>
  );
};

export default SubmitButton;
