"use client";

import styles from "./styles.module.scss";
import { MdOutlineDateRange } from "react-icons/md";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { handleFilterChange } from "@/utils/handleFilterChange";

/**
 * Componente de entrada de prazo
 *
 * @param props
 * @param props.setDeadlineValue - setState function
 * @param props.deadlineValue - prazo value de state
 */
const DeadlineInput = () => {
  const [deadline, setDeadline] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <label className={styles.deadlineInputContainer}>
      <span>
        <MdOutlineDateRange /> Prazo
      </span>
      <input
        type="date"
        value={deadline}
        onChange={(e) => handleFilterChange(router, setDeadline, searchParams, deadline, e.target.value, "deadline")}
      />
    </label>
  );
};

export default DeadlineInput;
