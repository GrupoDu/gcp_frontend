"use client";

import { createContext } from "react";
import { Product } from "@/types/product.type";

type ProductContextValues = {
  productsData: Product[] | undefined;
  err: string | undefined;
  status: string | undefined;
};

export const ProductContext = createContext<ProductContextValues | undefined>(
  undefined,
);
