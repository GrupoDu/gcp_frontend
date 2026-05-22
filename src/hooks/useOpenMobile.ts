import { useContext } from "react";
import { OpenMobileContext } from "@/context/openMobile.context";

export function useOpenMobile() {
  const context = useContext(OpenMobileContext);

  if (!context) throw new Error("useOpenMobile deve ser usado com um Provider");

  return context;
}
