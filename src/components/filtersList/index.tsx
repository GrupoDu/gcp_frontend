import React from "react";
import styles from "./styles.module.scss";
import { FaPlus } from "react-icons/fa";
import LinkButton from "../linkButton";

type FiltersListProps = {
  prazo?: React.ReactNode;
  produto?: React.ReactNode;
  funcionario?: React.ReactNode;
  estado?: React.ReactNode;
  periodo?: React.ReactNode;
  pesquisa?: React.ReactNode;
  tipo?: React.ReactNode;
  buttonPlaceholder: string;
};

const FiltersList = (props: FiltersListProps) => {
  return (
    <div className={styles.filtersListContainer}>
      {props.prazo && <>{props.prazo}</>}
      {props.produto && <>{props.produto}</>}
      {props.funcionario && <>{props.funcionario}</>}
      {props.estado && <>{props.estado}</>}
      {props.periodo && <>{props.periodo}</>}
      {props.pesquisa && <>{props.pesquisa}</>}
      {props.tipo && <>{props.tipo}</>}
      <label className={styles.addButton}>
        <span>{props.buttonPlaceholder}</span>
        <LinkButton href="/" color="black" fullWidth={true}>
          <FaPlus color={"white"} />
          Adicionar
        </LinkButton>
      </label>
    </div>
  );
};

export default FiltersList;
