import { RegisterContext } from "@/context/registerContext";
import { useContext } from "react";

export function useRegisters() {
  const registersContext = useContext(RegisterContext);

  if (!registersContext)
    throw new Error("useRegister deve ser usado com um Provider.");

  return registersContext;
}
