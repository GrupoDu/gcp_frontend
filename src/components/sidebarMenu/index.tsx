"use client";

import styles from "./styles.module.scss";
import MenuOption from "../menuOption";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { BiLogOutCircle } from "react-icons/bi";
import Image from "next/image";
import GrupoduImage from "../../assets/grupodu_new_logo.png";
import { useEffect, useRef, useState } from "react";
import { api } from "@/services/api";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { adminPages, supervisorPages } from "@/Constants/menuOptions.constant";
import { usePathname } from "next/navigation";

const SidebarMenu = () => {
  const [actualPage, setActualPage] = useState("");
  const [userRole, setUserRole] = useState("");
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const role = localStorage.getItem("@App:userRole") || "";
    setUserRole(role);
    if (userRole !== "") setIsLoading(false);
    setActualPage(pathname);
  }, [pathname, userRole]);

  function toggleSidebar() {
    setIsSidebarClosed(!isSidebarClosed);
  }

  const isAdmin = userRole === "Admin";

  async function handleLogout() {
    setIsLoading(true);
    try {
      await api.post("/auth/logout");

      window.location.href = "/login";
    } catch (err) {
      const error = err as Error;
      console.log(error.message);
      toast.error("Houve um problema ao finalizar sessão.");
    } finally {
      window.location.href = "/login";
      setIsLoading(false);
    }
  }

  function handleClick() {
    setIsSidebarClosed(!isSidebarClosed);
  }

  return (
    <aside className={`${styles.sidebarMenuContainer} ${isSidebarClosed ? styles.closed : ""}`}>
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
          {isAdmin
            ? adminPages.map((option) => (
                <MenuOption
                  onClick={handleClick}
                  key={option.menuTitle}
                  MenuIcon={option.MenuIcon}
                  isSelected={option.pageName === actualPage}
                  href={option.href}
                  menuTitle={option.menuTitle}
                />
              ))
            : supervisorPages.map((option) => (
                <MenuOption
                  onClick={handleClick}
                  key={option.menuTitle}
                  MenuIcon={option.MenuIcon}
                  isSelected={option.pageName === actualPage}
                  href={option.href}
                  menuTitle={option.menuTitle}
                />
              ))}
        </div>
      )}

      <button
        onClick={toggleSidebar}
        className={`${styles.openSidebarButton} ${isSidebarClosed && styles.openSidebar}`}
      >
        <MdKeyboardArrowRight />
      </button>
      <div className={styles.logoutButtonContainer}>
        <button onClick={toggleSidebar} className={styles.closeSidebarButtonContainer}>
          <MdKeyboardArrowLeft className={styles.closeSidebarButton} />
        </button>
        <button className={styles.logoutButton} onClick={handleLogout}>
          {isLoading ? (
            <ClipLoader color="#FFFFFF" size={15} aria-label="Loading Spinner" data-testid="loader" />
          ) : (
            <BiLogOutCircle className={styles.logoutIcon} />
          )}
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
};

export default SidebarMenu;
