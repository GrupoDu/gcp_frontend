"use client";

import React, { CSSProperties } from "react";
import styles from "./styles.module.scss";
import { FaPlus } from "react-icons/fa";
import LinkButton from "../linkButton";
import { IoFilter } from "react-icons/io5";
import { useOpenMobile } from "@/hooks/useOpenMobile";
import { AiOutlineClear } from "react-icons/ai";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { isNotPageParams } from "@/utils/isNotPageParams";
import { getSearchParams } from "@/utils/getSearchParams";

type FiltersListProps = {
  children: React.ReactNode;
  hrefButton: string;
  buttonLabel: string;
  filterFunc?: () => void;
  style?: CSSProperties;
};

function clearFilters(searchParams: URLSearchParams) {
  const params = getSearchParams(searchParams);

  params.forEach((_, key) => {
    if (isNotPageParams(key)) params.delete(key);
  });

  return params.toString();
}

const FiltersList = (props: FiltersListProps) => {
  const { setOpenMobile, openMobile } = useOpenMobile();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleClear = () => {
    const params = clearFilters(searchParams);
    router.push(`${pathname}?${params}`);
  };

  return (
    <div style={props.style} className={`${styles.filtersListContainer} filter`}>
      <div className={styles.desktopFilters}>
        {props.children}
        <label className={styles.filterButton}>
          <span>Limpar Filtros</span>
          <button type="button" onClick={handleClear}>
            <AiOutlineClear size={20} />
          </button>
        </label>
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
    </div>
  );
};

export default FiltersList;
