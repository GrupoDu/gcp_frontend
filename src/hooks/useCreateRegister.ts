import { useProducts } from "./useProducts";
import { useUsers } from "./useUsers";

export function useCreateRegister() {
  const usersContext = useUsers();
  const productsContext = useProducts();

  if (!usersContext || !productsContext) throw new Error("Contexto faltando.");

  return {
    usersContext,
    productsContext,
  };
}
