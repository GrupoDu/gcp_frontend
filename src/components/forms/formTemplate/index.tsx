import styles from "./styles.module.scss";
import React from "react";

type FormTemplateProps = {
  submitHandler: (e: React.SubmitEvent) => void;
  children: React.ReactNode;
};

const FormTemplate = (props: FormTemplateProps) => {
  const { submitHandler, children } = props;

  return (
    <form onSubmit={submitHandler} className={styles.formTemplateContainer}>
      {children}
    </form>
  );
};

export default FormTemplate;
