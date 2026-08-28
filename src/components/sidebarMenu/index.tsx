"use client";

import styles from "./styles.module.scss";
import MenuOption from "../menuOption";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { BiLogOutCircle } from "react-icons/bi";
import Image from "next/image";
import GrupoduImage from "../../assets/grupodu_new_logo.png";
import { useState } from "react";
import { api } from "@/services/api";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { ADMIN_PAGES, SUPERVISOR_PAGES } from "@/constants/menuOptions.constant";
import { usePathname, useRouter } from "next/navigation";

const SidebarMenu = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => setIsSidebarClosed(!isSidebarClosed);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await api.post("/auth/logout");
      localStorage.removeItem("@App:userRole");
    } catch (e) {
      const err = e as Error;
      console.log(err.message);
      toast.error("Houve um problema ao finalizar sessão.");
    } finally {
      router.push("/login");
      setIsLoading(false);
    }
  };

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
          <Options handleClick={toggleSidebar} />
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
  const pathname = usePathname();
  let role = "";

  if (typeof window !== "undefined") {
    role = localStorage.getItem("@App:userRole") || "";
  }

  const isAdmin = role === "Admin";

  if (isAdmin) {
    return ADMIN_PAGES.map((option) => (
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

  return SUPERVISOR_PAGES.map((option) => (
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
