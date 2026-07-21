import styles from "./styles.module.scss";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

export const Pagination = ({ maxPages }: { maxPages?: number }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const page = searchParams.get("page");
  const perPage = searchParams.get("per_page");

  const isPage = (selectedPage: number) => parseInt(page as string, 10) === selectedPage;

  if (!maxPages) return <h3>Página não encontrada</h3>;

  const calculatePagination = () => {
    const pages: number[] = [];
    for (let i = 1; i <= maxPages; i++) {
      pages.push(i);

      if (i > 5) return;
    }

    return pages;
  };

  return (
    <div className={styles.paginationContainer}>
      {calculatePagination()?.map((p, index) => (
        <Link
          href={`${pathname}?page=${p}&per_page=${perPage}`}
          key={index}
          className={`${styles.page} ${isPage(p) ? styles.isPage : ""}`}
        >
          {p}
        </Link>
      ))}
      {maxPages > 5 && <span>{maxPages}</span>}
    </div>
  );
};
