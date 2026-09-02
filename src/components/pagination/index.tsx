"use client";

import styles from "./styles.module.scss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { setQueryParams } from "@/utils/setQueryParams";
import { AiOutlineReload } from "react-icons/ai";
import { useState } from "react";
import { getSearchParams } from "@/utils/getSearchParams";

type PaginationProps = {
  maxPage: number;
};

const reloadToPageSize = (searchParams: URLSearchParams, pageSize: number) => {
  const params = getSearchParams(searchParams);
  params.set("pageSize", pageSize.toString());
  params.set("page", "1");
  return params.toString();
};

export const Pagination = (props: PaginationProps) => {
  const { maxPage } = props;
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const pageSizeParam = parseInt(searchParams.get("pageSize") || "10");
  const [pageSize, setPageSize] = useState(pageSizeParam);
  const allPages = Array.from({ length: maxPage }, (_, i) => i + 1);
  const currentSequence = getCurrentSequence(parseInt(page), allPages);

  const handleReloadPageSize = () => {
    const params = reloadToPageSize(searchParams, pageSize);
    setPageSize(pageSize);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.pagination}>
        <DisplayFirstPage sequenceFirstIndex={currentSequence[0]} />
        <DisplayPages currentSequence={currentSequence} />
        <DisplayLastPage maxPage={maxPage} />
      </div>
      <div className={styles.pageSizeSetter}>
        <div className={styles.inputContainer}>
          <span>Itens/página:</span>
          <input type={"number"} value={pageSize} onChange={(e) => setPageSize(parseInt(e.target.value))} max={12} />
        </div>
        <button type="button" onClick={() => handleReloadPageSize()}>
          <AiOutlineReload />
        </button>
      </div>
    </div>
  );
};

function DisplayPages({ currentSequence }: { currentSequence: number[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const isSelected = (page: number) => page === Number(searchParams.get("page"));

  return currentSequence.map((page) => (
    <button
      key={page}
      onClick={() => {
        const params = setQueryParams({
          searchParams,
          key: "page",
          value: page.toString(),
        });
        router.push(`${pathname}?${params}`);
      }}
      className={`${styles.page} ${isSelected(page) ? styles.isPage : ""}`}
    >
      {page}
    </button>
  ));
}

function DisplayFirstPage({ sequenceFirstIndex }: { sequenceFirstIndex: number }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const isNotFirstSequence = sequenceFirstIndex > 4;

  if (!isNotFirstSequence) return;

  return (
    <>
      <button
        onClick={() => {
          const params = setQueryParams({
            searchParams,
            key: "page",
            value: "1",
          });
          router.push(`${pathname}?${params}`);
        }}
        className={styles.page}
      >
        1
      </button>
      <span className={styles.spaceDots}>...</span>
    </>
  );
}

function DisplayLastPage({ maxPage }: { maxPage: number }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const page = Number(searchParams.get("page")) || 1;
  const isLastSequence = page + 4 >= maxPage;

  if (isLastSequence) return;

  return (
    <>
      <span className={styles.spaceDots}>...</span>
      <button
        onClick={() => {
          const params = setQueryParams({
            searchParams,
            key: "page",
            value: maxPage.toString(),
          });
          router.push(`${pathname}?${params}`);
        }}
        className={styles.page}
      >
        {maxPage}
      </button>
    </>
  );
}

/**
 * Retorna a sequência de números para exibição na paginação.
 *
 * @param page - Página atual
 * @param allPages - Array com todas as páginas
 */
function getCurrentSequence(page: number, allPages: number[]) {
  const isFirstPage = page === 1;
  const sequenceEnd = page + 4;
  const sequenceStart = isFirstPage ? page - 1 : page - 2;
  return allPages.slice(sequenceStart, sequenceEnd);
}
