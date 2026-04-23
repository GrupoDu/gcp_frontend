"use client";

import React from "react";
import FilterDropdownBase from "../filterDropdown";
import { useProducts } from "@/hooks/useProducts";

const ProductsDropdown = ({
  setProductValue,
  productValue,
}: {
  setProductValue: (value: string) => void;
  productValue: string;
}) => {
  const { productsData } = useProducts();

  return (
    <FilterDropdownBase label="produto" placeholder="Produto" setValue={setProductValue} value={productValue}>
      <option value="">Todos</option>
      {productsData?.map((product) => (
        <option key={product.product_uuid} value={product.product_uuid}>
          {product.name}
        </option>
      ))}
    </FilterDropdownBase>
  );
};

export default ProductsDropdown;
