"use client";

import React from "react";
import styles from "./styles.module.scss";

type FilterDropdownProps = {
  label: string;
  // Icon: IconType;
  children: React.ReactNode;
  placeholder?: string;
  options?: string[];
  value?: string;
  setValue: (value: string) => void;
};

const FilterDropdownBase = (props: FilterDropdownProps) => {
  return (
    <label className={styles.filterDropdownContainer}>
      <span>
        {/* <props.Icon /> */}
        <p>{props.placeholder}</p>
      </span>
      <select
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
        name="filter-dropdown"
        className="filter-dropdown"
      >
        {props.children}
      </select>
    </label>
  );
};

export default FilterDropdownBase;
