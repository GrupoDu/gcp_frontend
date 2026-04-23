"use client";

import styles from "./styles.module.scss";
import { MdOutlineDateRange } from "react-icons/md";

/**
 * Componente de entrada de prazo
 *
 * @param props
 * @param props.setDeadlineValue - setState function
 * @param props.deadlineValue - prazo value de state
 */
const DeadlineInput = ({
  setDeadlineValue,
  deadlineValue,
}: {
  setDeadlineValue: (value: string) => void;
  deadlineValue: string;
}) => {
  return (
    <label className={styles.deadlineInputContainer}>
      <span>
        <MdOutlineDateRange /> Prazo
      </span>
      <input type="date" value={deadlineValue} onChange={(e) => setDeadlineValue(e.target.value)} />
    </label>
  );
};

export default DeadlineInput;
