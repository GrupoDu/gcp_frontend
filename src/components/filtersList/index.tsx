"use client";

import React, { CSSProperties } from "react";
import styles from "./styles.module.scss";
import { FaPlus } from "react-icons/fa";
import LinkButton from "../linkButton";
import { IoFilter, IoReload } from "react-icons/io5";
import { useLoading } from "@/hooks/useLoading";
import { ClipLoader } from "react-spinners";
import { useOpenMobile } from "@/hooks/useOpenMobile";

type FiltersListProps = {
  children: React.ReactNode;
  hrefButton: string;
  buttonLabel: string;
  style?: CSSProperties;
};

const FiltersList = (props: FiltersListProps) => {
  const { isLoading } = useLoading();
  const { setOpenMobile, openMobile } = useOpenMobile();

  return (
    <div style={props.style} className={`${styles.filtersListContainer} filter`}>
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
      {props.hrefButton && (
        <label className={styles.addButton}>
          <span>{props.buttonLabel}</span>
          <LinkButton href={props.hrefButton} color="black" fullWidth={true}>
            <FaPlus color={"white"} />
            Adicionar
          </LinkButton>
        </label>
      )}
      <div className={styles.mobileFilters}>
        <span>Filtros</span>
        <button onClick={() => setOpenMobile(!openMobile)} type="button">
          <IoFilter />
        </button>
      </div>
      <label className={styles.reloadButton}>
        <span>Atualizar</span>
        <button type="button">
          {isLoading ? <ClipLoader color="#000000" size={10} /> : <IoReload className={styles.reloadIcon} />}
        </button>
      </label>
    </div>
  );
};

export default FiltersList;
