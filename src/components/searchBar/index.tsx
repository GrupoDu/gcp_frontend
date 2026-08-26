"use client";

import React, { useState } from "react";
import styles from "./styles.module.scss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { setQueryParams } from "@/utils/setQueryParams";

const SeachBar = ({ targetFilter }: { targetFilter: string }) => {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    const params = setQueryParams({ searchParams, key: targetFilter, value: e.target.value });
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
