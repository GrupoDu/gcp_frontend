"use client";

import styles from "./styles.module.scss";
import { usePathname, useRouter } from "next/navigation";
import { CSSProperties } from "react";

export const Breadcrumb = () => {
  const pathname = usePathname();
  const router = useRouter();
  const pathArray = pathname.split("/").filter(Boolean);
  const selectedStyle = (index: number): CSSProperties =>
    index === pathArray.length - 1 ? { fontWeight: "bold" } : {};

  return (
    <div className={styles.breadcrumb}>
      <div className={styles.paths}>
        <span onClick={() => router.back()}>{pathArray[0]}</span>
        <span>&gt;</span>
        {pathArray.map((path, index) => {
          return (
            index > 0 && (
              <span onClick={() => index === 0 && router.back()} key={index} style={selectedStyle(index)}>
                {path.charAt(0).toUpperCase() + path.slice(1)}
              </span>
            )
          );
        })}
      </div>
    </div>
  );
};
