"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import FilterDropdownBase from "../filterDropdown";
import { useProducts } from "@/hooks/useProducts";
import { useRouter, useSearchParams } from "next/navigation";

const ProductsDropdown = ({
  setProductValue,
  productValue,
}: {
  setProductValue: (value: string) => void;
  productValue: string;
}) => {
  const { productsData, err, status } = useProducts();

  return (
    <FilterDropdownBase label="produto" placeholder="Produto" setValue={setProductValue} value={productValue}>
      <option value="">Todos</option>
      {productsData?.map((product) => (
        <option key={product.uuid} value={product.uuid}>
          {product.name}
        </option>
      ))}
    </FilterDropdownBase>
  );
};

export default ProductsDropdown;
