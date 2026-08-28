import styles from "./styles.module.scss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineReload } from "react-icons/ai";
import { getSearchParams } from "@/utils/getSearchParams";

const calculatePagination = (maxPages: number) => {
  const pages: number[] = [];
  for (let i = 1; i <= maxPages; i++) {
    pages.push(i);

    if (i > 5) return;
  }

  return pages;
};

export const Pagination = ({ maxPages }: { maxPages?: number }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const page = searchParams.get("page");
  const perPage = searchParams.get("pageSize");
  const router = useRouter();
  const [pageSize, setPageSize] = useState<number>(parseInt(perPage || "10"));

  const isPage = (selectedPage: number) => parseInt(page as string, 10) === selectedPage;

  if (!maxPages) return <h3>Página não encontrada</h3>;

  const reloadToPageSize = () => {
    const params = getSearchParams(searchParams);
    params.set("pageSize", pageSize.toString());
    params.set("page", "1");
    setPageSize(pageSize);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleChangePage = (targetPage: number) => {
    const params = getSearchParams(searchParams);
    params.set("page", targetPage.toString());
    return params.toString();
  };

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.pagination}>
        {calculatePagination(maxPages)?.map((p, index) => (
          <Link
            href={`${pathname}?${handleChangePage(p)}`}
            key={index}
            className={`${styles.page} ${isPage(p) ? styles.isPage : ""}`}
          >
            {p}
          </Link>
        ))}
        {maxPages > 5 && <span>{maxPages}</span>}
      </div>
      <div className={styles.pageSizeSetter}>
        <div className={styles.inputContainer}>
          <span>Itens/página:</span>
          <input type={"number"} value={pageSize} onChange={(e) => setPageSize(parseInt(e.target.value))} max={12} />
        </div>
        <button type="button" onClick={() => reloadToPageSize()}>
          <AiOutlineReload />
        </button>
      </div>
    </div>
  );
};
