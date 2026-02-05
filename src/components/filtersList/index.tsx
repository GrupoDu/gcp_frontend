import React from "react";
import styles from "./styles.module.scss";
import { FaPlus } from "react-icons/fa";
import LinkButton from "../linkButton";

type FiltersListProps = {
  children: React.ReactNode;
  hrefButton: string;
};

const FiltersList = (props: FiltersListProps) => {
  return (
    <div className={styles.filtersListContainer}>
      {props.children} 
      <label className={styles.addButton}>
        <span>Button</span>
        <LinkButton href={props.hrefButton} color="black" fullWidth={true}>
          <FaPlus color={"white"} />
          Adicionar
        </LinkButton>
      </label>
    </div>
  );
};

export default FiltersList;
