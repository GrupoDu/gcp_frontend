"use client";

import styles from "./styles.module.scss";
import { MdOutlineDateRange } from "react-icons/md";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { setQueryParams } from "@/utils/setQueryParams";

/**
 * Componente de entrada de prazo
 */
const DeadlineInput = () => {
  const [deadline, setDeadline] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleDeadlineChange = (value: string) => {
    setDeadline(value);
    const params = setQueryParams({ searchParams, key: "deadline", value });
    router.push(`${pathname}?${params}`);
  };

  return (
    <label className={styles.deadlineInputContainer}>
      <span>
        <MdOutlineDateRange /> Prazo
      </span>
      <input type="date" value={deadline} onChange={(e) => handleDeadlineChange(e.target.value)} />
    </label>
  );
};

export default DeadlineInput;
