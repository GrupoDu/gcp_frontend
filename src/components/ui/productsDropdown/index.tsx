"use client";

import React, { useRef, useState } from "react";
import FilterDropdownBase from "../filterDropdown";
import { useFetch } from "@/hooks/useFetch";
import { Product } from "@/types/product.interface";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { setQueryParams } from "@/utils/setQueryParams";

const ProductsDropdown = () => {
  const { data: products } = useFetch<Product[]>("product");
  const [productFilter, setProductFilter] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleProductChange = (value: string) => {
    setProductFilter(value);
    const params = setQueryParams({
      searchParams,
      value,
      key: "productUuid",
    });
    router.push(`${pathname}?${params}`);
  };

  return (
    <FilterDropdownBase
      label="produto"
      placeholder="Produto"
      setValue={(e) => handleProductChange(e.target.value)}
      value={productFilter}
    >
      <option value="" data-key={""}>
        Todos
      </option>
      {products?.map((product, index) => (
        <option key={product.productUuid} value={product.productUuid} data-key={index}>
          {product.acronym}
        </option>
      ))}
    </FilterDropdownBase>
  );
};

export default ProductsDropdown;
