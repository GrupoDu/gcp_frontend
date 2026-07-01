"use client";

import styles from "./styles.module.scss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";

interface DateInputProps {
  label: string;
  setValue: (value: string) => void;
  value: string;
  isFilter: boolean;
  filterTarget?: string;
}

export const DateInput = (props: DateInputProps) => {
  const { label, setValue, value, isFilter, filterTarget } = props;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    if (isFilter && filterTarget) {
      const params = new URLSearchParams(searchParams);
      params.set(filterTarget, e.target.value);
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <label htmlFor={"inputDate"} className={styles.inputDate}>
      <span>{label}</span>
      <input type="date" id={"inputDate"} onChange={handleDateChange} value={value} />
    </label>
  );
};
