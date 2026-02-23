import React from "react";
import styles from "./styles.module.scss";
import { FaPlus } from "react-icons/fa";
import LinkButton from "../linkButton";
import { IoFilter } from "react-icons/io5";

type FiltersListProps = {
  children: React.ReactNode;
  hrefButton: string;
  buttonLabel: string;
  openMobileFilters: (bool: boolean) => void;
  openFilterContainer: boolean;
};

const FiltersList = (props: FiltersListProps) => {
  return (
    <div className={styles.filtersListContainer}>
      <div className={styles.desktopFilters}>
        {props.children}
        <label className={styles.addButton}>
          <span>{props.buttonLabel}</span>
          <LinkButton href={props.hrefButton} color="black" fullWidth={true}>
            <FaPlus color={"white"} />
            Adicionar
          </LinkButton>
        </label>
      </div>
      <label className={styles.addButton}>
        <span>{props.buttonLabel}</span>
        <LinkButton href={props.hrefButton} color="black" fullWidth={true}>
          <FaPlus color={"white"} />
          Adicionar
        </LinkButton>
      </label>
      <div className={styles.mobileFilters}>
        <span>Filtros</span>
        <button
          onClick={() => props.openMobileFilters(!props.openFilterContainer)}
          type="button"
        >
          <IoFilter />
        </button>
      </div>
    </div>
  );
};

export default FiltersList;
