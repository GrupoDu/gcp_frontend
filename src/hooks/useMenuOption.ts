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
      }
    }

    getActualPath();
  });

  return [actualPathname];
}
