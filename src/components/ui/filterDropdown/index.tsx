import React from "react";
import styles from "./styles.module.scss";
import { IconType } from "react-icons";

type FilterDropdownProps = {
  label: string;
  Icon: IconType;
  placeholder?: string;
  options?: string[];
};

const FilterDropdown = (props: FilterDropdownProps) => {
  return (
    <label className={styles.filterDropdownContainer}>
      <span>
        <props.Icon />
        <p>{props.placeholder}</p>
      </span>
      <select name="filter-dropdown" className="filter-dropdown">
        <option value="">{props.label}</option>
        {props.options?.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
};

export default FilterDropdown;
