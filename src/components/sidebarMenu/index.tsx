"use client";

import styles from "./styles.module.scss";
import MenuOption from "../menuOption";
import { MdDashboard } from "react-icons/md";
import { IoMdClipboard } from "react-icons/io";
import { LuGoal } from "react-icons/lu";
import { FaUserCog } from "react-icons/fa";
import { GrAnalytics } from "react-icons/gr";
import { useMenuOption } from "@/hooks/useMenuOption";
import { useEffect } from "react";
import { GrUserWorker } from "react-icons/gr";
import { useRouter } from "next/navigation";
import { BiLogOutCircle } from "react-icons/bi";

const SidebarMenu = () => {
  const [actualPage] = useMenuOption();
  const router = useRouter();

  const menuOption = [
    {
      MenuIcon: MdDashboard,
      pageName: "dashboard",
      href: "/dashboard",
      menuTitle: "Dashboard",
    },
    {
      MenuIcon: IoMdClipboard,
      pageName: "producao",
      href: "/producao?prazo=&produto=todos&funcionario=todos&estado=todos",
      menuTitle: "Produção",
    },
    {
      MenuIcon: LuGoal,
      pageName: "metas",
      href: "/metas",
      menuTitle: "Metas",
    },
    {
      MenuIcon: FaUserCog,
      pageName: "usuarios",
      href: "/usuarios",
      menuTitle: "Usuários",
    },
    {
      MenuIcon: GrUserWorker,
      pageName: "funcionarios",
      href: "/funcionarios",
      menuTitle: "Funcionários",
    },
    {
      MenuIcon: GrAnalytics,
      pageName: "analises",
      href: "/analises",
      menuTitle: "Análises",
    },
  ];

  async function handleLogout() {
    try {
      const response = await fetch("http://localhost:8000/login/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Erro ao fazer logout.");
      }

      window.location.href = "/login";
    } catch (err) {
      console.log((err as Error).message);
    }
  }

  useEffect(() => {
    console.log(actualPage);
  }, [actualPage]);

  return (
    <div className={styles.sidebarMenuContainer}>
      <h1>GCP</h1>
      <hr />
      <div className={styles.menuOptionsContainer}>
        {menuOption.map((option) => (
          <MenuOption
            key={option.menuTitle}
            MenuIcon={option.MenuIcon}
            isSelected={option.pageName === actualPage}
            href={option.href}
            menuTitle={option.menuTitle}
          />
        ))}
      </div>
      <div className={styles.logoutButtonContainer}>
        <button type="button" onClick={handleLogout}>
          <BiLogOutCircle className={styles.logoutIcon} />
          Sair
        </button>
      </div>
    </div>
  );
};

export default SidebarMenu;
