"use client";

import React, { useRef, useState } from "react";
import styles from "./styles.module.scss";
import { useRouter, useSearchParams } from "next/navigation";
import { handleFilterChange } from "@/utils/handleFilterChange";

const SeachBar = ({ targetFilter }: { targetFilter: string }) => {
  const [searchValue, setSearchValue] = useState("");
  const filterParam = useRef("");
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <label className={styles.searchBarContainer}>
      <span>Pesquisar</span>
      <input
        value={searchValue}
        onChange={(e) =>
          handleFilterChange(router, setSearchValue, searchParams, filterParam, e.target.value, targetFilter)
        }
        type="text"
        placeholder="Pesquisar..."
      />
    </label>
  );
};

export default SeachBar;
