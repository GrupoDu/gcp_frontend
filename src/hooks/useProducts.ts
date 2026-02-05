import { ProductContext } from "@/context/product.context";
import { useContext } from "react";

export function useProducts() {
  const productsContext = useContext(ProductContext);

  if (!productsContext)
    throw new Error("productsContext deve ser usado com um Provider.");

  return productsContext;
}
