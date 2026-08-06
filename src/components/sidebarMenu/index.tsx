"use client";

import styles from "./styles.module.scss";
import MenuOption from "../menuOption";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { BiLogOutCircle } from "react-icons/bi";
import Image from "next/image";
import GrupoduImage from "../../assets/grupodu_new_logo.png";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { adminPages, supervisorPages } from "@/Constants/menuOptions.constant";
import { usePathname } from "next/navigation";

const SidebarMenu = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);

  function toggleSidebar() {
    setIsSidebarClosed(!isSidebarClosed);
  }

  function handleClick() {
    setIsSidebarClosed(!isSidebarClosed);
  }

  async function handleLogout() {
    setIsLoading(true);
    try {
      await api.post("/auth/logout");

      localStorage.removeItem("@App:userRole");
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
          <Options handleClick={handleClick} />
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

function Options({ handleClick }: { handleClick: () => void }) {
  const [userRole, setUserRole] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const role = localStorage.getItem("@App:userRole") || "";
    setUserRole(role);
  }, []);

  const isAdmin = userRole === "Admin";

  if (isAdmin) {
    return adminPages.map((option) => (
      <MenuOption
        onClick={handleClick}
        key={option.menuTitle}
        MenuIcon={option.MenuIcon}
        isSelected={option.pageName === pathname.split("/")[1]}
        href={option.href}
        menuTitle={option.menuTitle}
      />
    ));
  }

  return supervisorPages.map((option) => (
    <MenuOption
      onClick={handleClick}
      key={option.menuTitle}
      MenuIcon={option.MenuIcon}
      isSelected={option.pageName === pathname.split("/")[1]}
      href={option.href}
      menuTitle={option.menuTitle}
    />
  ));
}

export default SidebarMenu;
