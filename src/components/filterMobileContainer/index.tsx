import styles from "./styles.module.scss";
import React from "react";
import { useOpenMobile } from "@/hooks/useOpenMobile";

/**
 * Componente que renderiza um container de filtros para dispositivos móveis
 *
 * @param props
 * @param {React.ReactNode} props.children - Elementos
 * @param {boolean} props.isFilterContainerOpen - Booleano para verificar se o container de filtros deve ser aberto
 * @constructor
 */
const FilterMobileContainer = ({ children }: { children: React.ReactNode }) => {
  const { openMobile } = useOpenMobile();

  return <div className={`${styles.filterMobileContainer} ${openMobile && styles.open}`}>{children}</div>;
};

export default FilterMobileContainer;
