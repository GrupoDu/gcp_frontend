"use client";

import styles from "./styles.module.scss";
import MenuOption from "../menuOption";
import { MdDashboard } from "react-icons/md";
import { IoMdClipboard } from "react-icons/io";
import { IconType } from "react-icons";
import { LuGoal } from "react-icons/lu";
import { FaUserCog } from "react-icons/fa";
import { GrAnalytics } from "react-icons/gr";

type MenuOptionsProps = {
  MenuIcon: IconType;
  isSelected: boolean;
  menuTitle: string;
};

const SidebarMenu = () => {
  const menuOption: MenuOptionsProps[] = [
    {
      MenuIcon: MdDashboard,
      isSelected: true,
      menuTitle: "Dashboard",
    },
    {
      MenuIcon: IoMdClipboard,
      isSelected: false,
      menuTitle: "Produção",
    },
    {
      MenuIcon: LuGoal,
      isSelected: false,
      menuTitle: "Metas",
    },
    {
      MenuIcon: FaUserCog,
      isSelected: false,
      menuTitle: "Usuários",
    },
    {
      MenuIcon: GrAnalytics,
      isSelected: false,
      menuTitle: "Análises",
    },
  ];

  return (
    <div className={styles.sidebarMenuContainer}>
      <h1>GCP</h1>
      <hr />
      <div className={styles.menuOptionsContainer}>
        {menuOption.map((option) => (
          <MenuOption
            key={option.menuTitle}
            MenuIcon={option.MenuIcon}
            isSelected={option.isSelected}
            menuTitle={option.menuTitle}
          />
        ))}
      </div>
    </div>
  );
};

export default SidebarMenu;
