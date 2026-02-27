"use client";

import styles from "./styles.module.scss";
import MenuOption from "../menuOption";
import {
  MdDashboard,
  MdKeyboardArrowRight,
  MdOutlineFeedback,
} from "react-icons/md";
import { IoMdClipboard } from "react-icons/io";
import { LuGoal } from "react-icons/lu";
import { FaUserCog } from "react-icons/fa";
import { GrAnalytics } from "react-icons/gr";
import { GrUserWorker } from "react-icons/gr";
import { BiLogOutCircle } from "react-icons/bi";
import Image from "next/image";
import GrupoduImage from "../../assets/grupodu_new_logo.png";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { api } from "@/services/api";
import { toast } from "react-toastify";
import { debugLogger } from "@/utils/logger";

const SidebarMenu = () => {
  const [actualPage, setActualPage] = useState("");
  const pathname = usePathname();
  const [user_type, setUserType] = useState("");
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function tokenValidator() {
      try {
        const response = await api.get(`/users/validator`);

        if (response) {
          const data = await response.data;
          debugLogger(`
            ||> SidebarMenu <||
            Tipo de usuário: ${data.user_type}
            `);
          setUserType(data.user_type);
        } else {
          router.push("/login");
        }
      } catch (err) {
        console.log((err as Error).message);
      }
    }

    tokenValidator();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActualPage(pathname.split("/")[1]);
    setIsLoading(false);
  }, [router, pathname]);

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
      await api.post("/login/logout");

      window.location.href = "/login";
    } catch (err) {
      const error = err as Error;
      console.log(error.message);
      toast.error("Não foi possível finalizar sessão.");
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
      {isLoading ? (
        <div className={styles.loadingContainer}>
          <span>Carregando...</span>
        </div>
      ) : (
        <div className={styles.menuOptionsContainer}>
          {user_type === "admin"
            ? adminPages.map((option) => (
                <MenuOption
                  onClick={() => setIsSidebarClosed(true)}
                  key={option.menuTitle}
                  MenuIcon={option.MenuIcon}
                  isSelected={option.pageName === actualPage}
                  href={option.href}
                  menuTitle={option.menuTitle}
                />
              ))
            : supervisorPages.map((option) => (
                <MenuOption
                  onClick={() => setIsSidebarClosed(true)}
                  key={option.menuTitle}
                  MenuIcon={option.MenuIcon}
                  isSelected={option.pageName === actualPage}
                  href={option.href}
                  menuTitle={option.menuTitle}
                />
              ))}
          <MenuOption
            onClick={() => setIsSidebarClosed(true)}
            MenuIcon={MdOutlineFeedback}
            isSelected={actualPage === "feedback"}
            href="/feedback"
            menuTitle="Feedback"
          />
        </div>
      )}

      <button
        onClick={toggleSidebar}
        className={`${styles.openSidebarButton} ${isSidebarClosed && styles.openSidebar}`}
      >
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
