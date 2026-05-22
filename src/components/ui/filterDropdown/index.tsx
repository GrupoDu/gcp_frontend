import React from "react";
import styles from "./styles.module.scss";

type FilterDropdownProps = {
  label: string;
  children: React.ReactNode;
  setValue: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  options?: string[];
  value?: string;
};

const FilterDropdownBase = (props: FilterDropdownProps) => {
  return (
    <label className={styles.filterDropdownContainer}>
      <span>
        <p>{props.placeholder}</p>
      </span>
      <select value={props.value} onChange={props.setValue} name="filter-dropdown" className="filter-dropdown">
        {props.children}
      </select>
    </label>
  );
};

export default FilterDropdownBase;
