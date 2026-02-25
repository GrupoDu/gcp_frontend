import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function useMenuOption() {
  const pathname = usePathname();
  const [actualPathname, setActualPathname] = useState<string>();

  useEffect(() => {
    function getActualPath() {
      if (pathname.includes("dashboard")) {
        setActualPathname("dashboard");
      } else if (pathname.includes("producao")) {
        setActualPathname("producao");
      } else if (pathname.includes("metas")) {
        setActualPathname("metas");
      } else if (pathname.includes("usuarios")) {
        setActualPathname("usuarios");
      } else if (pathname.includes("funcionarios")) {
        setActualPathname("funcionarios");
      } else if (pathname.includes("analises")) {
        setActualPathname("analises");
      } else if (pathname.includes("feedback")) {
        setActualPathname("feedback");
      }
    }

    getActualPath();
  });

  return [actualPathname];
}
