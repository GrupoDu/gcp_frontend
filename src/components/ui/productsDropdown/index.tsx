"use client";

import React, { useRef, useState } from "react";
import FilterDropdownBase from "../filterDropdown";
import { useFetch } from "@/hooks/useFetch";
import { Product } from "@/types/product.type";
import { useRouter, useSearchParams } from "next/navigation";
import { handleFilterChange } from "@/utils/handleFilterChange";

const ProductsDropdown = () => {
  const { data: products } = useFetch<Product[]>("products");
  const [productFilter, setProductFilter] = useState("");
  const productFilterParam = useRef("");
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <FilterDropdownBase
      label="produto"
      placeholder="Produto"
      setValue={(e) =>
        handleFilterChange(
          router,
          setProductFilter,
          searchParams,
          productFilterParam,
          e.target.options[e.target.selectedIndex].innerText,
          "product",
        )
      }
      value={productFilter}
    >
      <option value="" data-key={""}>
        todos
      </option>
      {products?.map((product, index) => (
        <option key={product.product_uuid} data-key={index}>
          {product.acronym}
        </option>
      ))}
    </FilterDropdownBase>
  );
};

export default ProductsDropdown;
