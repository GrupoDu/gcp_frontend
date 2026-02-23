"use client";

import { ProductContext } from "@/context/product.context";
import { useFetch } from "@/hooks/useFetch";
import { Product } from "@/types/product.type";
import { useMemo } from "react";

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const { data, err, status } = useFetch<Product[]>(
    "products",
  );

  const productData = useMemo(
    () => ({
      productsData: data || undefined,
      err,
      status,
    }),
    [data, err, status],
  );

  return (
    <ProductContext.Provider value={productData}>
      {children}
    </ProductContext.Provider>
  );
}
