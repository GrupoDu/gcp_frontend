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

const SidebarMenu = () => {
  const [actualPage] = useMenuOption();

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
    </div>
  );
};

export default SidebarMenu;
