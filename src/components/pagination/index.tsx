import styles from "./styles.module.scss";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export const Pagination = ({ max_pages }: { max_pages?: number }) => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const perPage = searchParams.get("per_page");

  const isPage = (selectedPage: number) => parseInt(page as string, 10) === selectedPage;

  if (!max_pages) return <h3>Página não encontrada</h3>;

  const calculatePagination = () => {
    const pages: number[] = [];
    for (let i = 1; i <= max_pages; i++) {
      pages.push(i);

      if (i > 5) return;
    }

    return pages;
  };

  return (
    <div className={styles.paginationContainer}>
      {calculatePagination()?.map((p, index) => (
        <Link
          href={`/producao?page=${p}&per_page=${perPage}`}
          key={index}
          className={`${styles.page} ${isPage(p) ? styles.isPage : ""}`}
        >
          {p}
        </Link>
      ))}
      {max_pages > 5 && <span>{max_pages}</span>}
    </div>
  );
};
