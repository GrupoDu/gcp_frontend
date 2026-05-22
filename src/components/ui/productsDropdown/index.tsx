"use client";

import React, { useState } from "react";
import FilterDropdownBase from "../filterDropdown";
import { useFetch } from "@/hooks/useFetch";
import { Product } from "@/types/product.type";
import { useRouter, useSearchParams } from "next/navigation";
import { handleFilterChange } from "@/utils/handleFilterChange";

const ProductsDropdown = () => {
  const { data: products } = useFetch<Product[]>("/products");
  const [productFilter, setProductFilter] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <FilterDropdownBase
      label="produto"
      placeholder="Produto"
      setValue={(e) =>
        handleFilterChange(router, setProductFilter, searchParams, productFilter, e.target.value, "product")
      }
      value={productFilter}
    >
      <option value="">Todos</option>
      {products?.map((product) => (
        <option key={product.product_uuid} value={product.product_uuid}>
          {product.name}
        </option>
      ))}
    </FilterDropdownBase>
  );
};

export default ProductsDropdown;
