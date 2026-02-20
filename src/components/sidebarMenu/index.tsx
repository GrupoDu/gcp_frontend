"use client";

import styles from "./styles.module.scss";
import MenuOption from "../menuOption";
import { MdDashboard } from "react-icons/md";
import { IoMdClipboard } from "react-icons/io";
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

const SidebarMenu = () => {
  const [actualPage] = useMenuOption();
  const [user_type, setUserType] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function tokenValidator() {
      try {
        const response = await fetch(
          "http://localhost:8000/users/validator",
          {
            credentials: "include",
          },
        );

        if (response.ok) {
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

  return (
    <div className={styles.sidebarMenuContainer}>
      <div className={styles.sidebarHeader}>
        <Image src={GrupoduImage} alt="Login" className={styles.grupoduLogo} />
        <h1>GCP</h1>
      </div>
      <hr />
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
      <div className={styles.logoutButtonContainer}>
        <div className={styles.logoutButton} onClick={handleLogout}>
          <BiLogOutCircle className={styles.logoutIcon} />
          <span>Sair</span>
        </div>
      </div>
    </div>
  );
};

export default SidebarMenu;
