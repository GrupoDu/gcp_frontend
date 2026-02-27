import { useEmployees } from "./useEmployees";
import { useProducts } from "./useProducts";
import { useUsers } from "./useUsers";

export function useCreateRegister() {
  const usersContext = useUsers();
  const productsContext = useProducts();
  const employeeContext = useEmployees();

  if (!usersContext || !productsContext) throw new Error("Contextos faltando.");

  return {
    usersContext,
    productsContext,
    employeeContext,
  };
}
