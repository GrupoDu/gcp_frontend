import React from "react";
import styles from "./styles.module.scss";

const SeachBar = ({
  searchValue,
  setSearchValue,
}: {
  searchValue: string;
  setSearchValue: (value: string) => void;
}) => {
  return (
    <label className={styles.searchBarContainer}>
      <span>Pesquisar</span>
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        type="text"
        placeholder="Pesquisar..."
      />
    </label>
  );
};

export default SeachBar;
