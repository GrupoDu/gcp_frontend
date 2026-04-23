import styles from "./styles.module.scss";
import React from "react";

/**
 * Componente que renderiza um container de filtros para dispositivos móveis
 *
 * @param props
 * @param {React.ReactNode} props.children - Elementos
 * @param {boolean} props.isFilterContainerOpen - Booleano para verificar se o container de filtros deve ser aberto
 * @constructor
 */
const FilterMobileContainer = ({
  children,
  isFilterContainerOpen,
}: {
  children: React.ReactNode;
  isFilterContainerOpen: boolean;
}) => {
  return <div className={`${styles.filterMobileContainer} ${isFilterContainerOpen && styles.open}`}>{children}</div>;
};

export default FilterMobileContainer;
