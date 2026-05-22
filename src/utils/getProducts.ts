import { api } from "@/services/api";
import { toast } from "react-toastify";
import { Product } from "@/types/product.type";

async function getProducts(): Promise<Product[] | undefined> {
  try {
    const response = await api.get("/products");
    return response.data.data;
  } catch (err) {
    const error = err as Error;
    toast.error(error.message);
  }

  return undefined;
}

export default getProducts;
