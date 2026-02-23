"use client";

import styles from "./styles.module.scss";
import MenuOption from "../menuOption";
import { MdDashboard, MdKeyboardArrowRight } from "react-icons/md";
import { IoMdClipboard, IoMdClose } from "react-icons/io";
import { LuGoal } from "react-icons/lu";
import { FaUserCog } from "react-icons/fa";
import { GrAnalytics } from "react-icons/gr";
import { useMenuOption } from "@/hooks/useMenuOption";
import { GrUserWorker } from "react-icons/gr";
import { BiLogOutCircle } from "react-icons/bi";
import Image from "next/image";
import GrupoduImage from "../../assets/grupodu_new_logo.png";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MdKeyboardArrowLeft } from "react-icons/md";

const SidebarMenu = () => {
  const [actualPage] = useMenuOption();
  const [user_type, setUserType] = useState("");
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL_HTTP;

  useEffect(() => {
    async function tokenValidator() {
      try {
        const response = await fetch(`${API_URL}/users/validator`, {
          credentials: "include",
        });

        if (response) {
          const data = await response.json();
          console.log(data);
          setUserType(data);
        } else {
          router.push("/login");
        }
      } catch (err) {
        console.log((err as Error).message);
      }
    }

    tokenValidator();
  }, [router]);

  const supervisorPages = [
    {
      MenuIcon: IoMdClipboard,
      pageName: "producao",
      href: "/producao",
      menuTitle: "Produção",
    },
    {
      MenuIcon: LuGoal,
      pageName: "metas",
      href: "/metas",
      menuTitle: "Metas",
    },
  ];

  const adminPages = [
    {
      MenuIcon: MdDashboard,
      pageName: "dashboard",
      href: "/dashboard",
      menuTitle: "Dashboard",
    },
    {
      MenuIcon: IoMdClipboard,
      pageName: "producao",
      href: "/producao",
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

  function toggleSidebar() {
    setIsSidebarClosed(!isSidebarClosed);
  }

  async function handleLogout() {
    try {
      const response = await fetch("https://192.168.1.8:8001/login/logout", {
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

  return (
    <aside
      className={`${styles.sidebarMenuContainer} ${isSidebarClosed ? styles.closed : ""}`}
    >
      <div className={styles.sidebarHeader}>
        <Image src={GrupoduImage} alt="Login" className={styles.grupoduLogo} />
        <h1>GCP</h1>
      </div>
      <div className={styles.menuOptionsContainer}>
        {user_type === "admin"
          ? adminPages.map((option) => (
              <MenuOption
                key={option.menuTitle}
                MenuIcon={option.MenuIcon}
                isSelected={option.pageName === actualPage}
                href={option.href}
                menuTitle={option.menuTitle}
              />
            ))
          : supervisorPages.map((option) => (
              <MenuOption
                key={option.menuTitle}
                MenuIcon={option.MenuIcon}
                isSelected={option.pageName === actualPage}
                href={option.href}
                menuTitle={option.menuTitle}
              />
            ))}
      </div>
      <button onClick={toggleSidebar} className={`${styles.openSidebarButton} ${isSidebarClosed && styles.openSidebar}`}>
        <MdKeyboardArrowRight />
      </button>
      <div className={styles.logoutButtonContainer}>
        <button
          onClick={toggleSidebar}
          className={styles.closeSidebarButtonContainer}
        >
          <MdKeyboardArrowLeft className={styles.closeSidebarButton} />
        </button>
        <button className={styles.logoutButton} onClick={handleLogout}>
          <BiLogOutCircle className={styles.logoutIcon} />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
};

export default SidebarMenu;
