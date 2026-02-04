import { UserContext } from "@/context/userContext";
import { useContext } from "react";

export function useUsers() {
  const usersContext = useContext(UserContext);

  if (usersContext === undefined) {
    throw new Error("useUsers deve ser usado com um Provider.");
  }

  return usersContext;
}
