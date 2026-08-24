import { IoMdClipboard } from "react-icons/io";
import { LuGoal } from "react-icons/lu";
import { MdDashboard } from "react-icons/md";
import { FaUserCog } from "react-icons/fa";
import { GrAnalytics, GrUserWorker } from "react-icons/gr";

const defaultUrl = (pathname: string) => `/${pathname}?page=1&pageSize=10`;

export const supervisorPages = [
  {
    MenuIcon: IoMdClipboard,
    pageName: "producao",
    href: defaultUrl("producao"),
    menuTitle: "Produção",
  },
  {
    MenuIcon: LuGoal,
    pageName: "metas",
    href: defaultUrl("metas"),
    menuTitle: "Metas",
  },
  {
    MenuIcon: IoMdClipboard,
    pageName: "soldadores",
    href: defaultUrl("soldadores"),
    menuTitle: "Soldadores",
  },
];

export const adminPages = [
  {
    MenuIcon: MdDashboard,
    pageName: "dashboard",
    href: "/dashboard",
    menuTitle: "Dashboard",
  },
  {
    MenuIcon: IoMdClipboard,
    pageName: "producao",
    href: defaultUrl("producao"),
    menuTitle: "Produção",
  },
  {
    MenuIcon: IoMdClipboard,
    pageName: "soldadores",
    href: defaultUrl("soldadores"),
    menuTitle: "Soldadores",
  },
  {
    MenuIcon: IoMdClipboard,
    pageName: "assistentes",
    href: defaultUrl("assistentes"),
    menuTitle: "Assistentes",
  },
  {
    MenuIcon: LuGoal,
    pageName: "metas",
    href: defaultUrl("metas"),
    menuTitle: "Metas",
  },
  {
    MenuIcon: FaUserCog,
    pageName: "usuarios",
    href: defaultUrl("usuarios"),
    menuTitle: "Usuários",
  },
  {
    MenuIcon: GrUserWorker,
    pageName: "funcionarios",
    href: defaultUrl("funcionarios"),
    menuTitle: "Funcionários",
  },
  {
    MenuIcon: GrAnalytics,
    pageName: "analises",
    href: "/analises",
    menuTitle: "Análises",
  },
];
