import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import { FaPlus } from "react-icons/fa";
import LinkButton from "../linkButton";
import { IoFilter, IoReload } from "react-icons/io5";
import { useLoading } from "@/hooks/useLoading";
import { ClipLoader } from "react-spinners";
import { socket } from "@/socket";
import { toast } from "react-toastify";

type FiltersListProps = {
  children: React.ReactNode;
  hrefButton: string;
  buttonLabel: string;
  openMobileFilters: (bool: boolean) => void;
  openFilterContainer: boolean;
};

const FiltersList = (props: FiltersListProps) => {
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    socket.on("productionOrderNotify", () => {
      toast.info("Nova ordem de produção registrada.");
    });

    return () => {
      socket.off("productionOrderNotify");
    };
  });

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
        <button onClick={() => props.openMobileFilters(!props.openFilterContainer)} type="button">
          <IoFilter />
        </button>
      </div>
      <label className={styles.reloadButton}>
        <span>Atualizar</span>
        <button
          type="button"
          onClick={() => {
            setIsLoading(true);
            window.location.reload();
          }}
        >
          {isLoading ? <ClipLoader color="#000000" size={10} /> : <IoReload className={styles.reloadIcon} />}
        </button>
      </label>
    </div>
  );
};

export default FiltersList;
