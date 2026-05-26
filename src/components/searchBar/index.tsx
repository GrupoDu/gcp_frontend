"use client";

import React, { useRef, useState } from "react";
import styles from "./styles.module.scss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SeachBar = ({ targetFilter }: { targetFilter: string }) => {
  const [searchValue, setSearchValue] = useState("");
  const filterParam = useRef("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    filterParam.current = e.target.value;
    const params = new URLSearchParams(`${searchParams.toString()}`);

    params.set(targetFilter, filterParam.current);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <label className={styles.searchBarContainer}>
      <span>Pesquisar</span>
      <input value={searchValue} onChange={(e) => handleSearch(e)} type="text" placeholder="Pesquisar..." />
    </label>
  );
};

export default SeachBar;
