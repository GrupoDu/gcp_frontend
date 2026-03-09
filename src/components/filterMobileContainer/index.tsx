import styles from "./styles.module.scss";
import React from "react";

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
