import { IoMdClipboard } from "react-icons/io";
import { LuGoal } from "react-icons/lu";
import { MdDashboard } from "react-icons/md";
import { FaUserCog } from "react-icons/fa";
import { GrAnalytics, GrUserWorker } from "react-icons/gr";

const DEFAULT_URL = (pathname: string) => `/${pathname}?page=1&pageSize=10`;

export const SUPERVISOR_PAGES = [
  {
    MenuIcon: IoMdClipboard,
    pageName: "producao",
    href: DEFAULT_URL("producao"),
    menuTitle: "Produção",
  },
  {
    MenuIcon: LuGoal,
    pageName: "metas",
    href: DEFAULT_URL("metas"),
    menuTitle: "Metas",
  },
  {
    MenuIcon: IoMdClipboard,
    pageName: "soldadores",
    href: DEFAULT_URL("soldadores"),
    menuTitle: "Soldadores",
  },
];

export const ADMIN_PAGES = [
  {
    MenuIcon: MdDashboard,
    pageName: "dashboard",
    href: "/dashboard",
    menuTitle: "Dashboard",
  },
  {
    MenuIcon: IoMdClipboard,
    pageName: "producao",
    href: DEFAULT_URL("producao"),
    menuTitle: "Produção",
  },
  {
    MenuIcon: IoMdClipboard,
    pageName: "soldadores",
    href: DEFAULT_URL("soldadores"),
    menuTitle: "Soldadores",
  },
  {
    MenuIcon: IoMdClipboard,
    pageName: "assistentes",
    href: DEFAULT_URL("assistentes"),
    menuTitle: "Assistentes",
  },
  {
    MenuIcon: LuGoal,
    pageName: "metas",
    href: DEFAULT_URL("metas"),
    menuTitle: "Metas",
  },
  {
    MenuIcon: FaUserCog,
    pageName: "usuarios",
    href: DEFAULT_URL("usuarios"),
    menuTitle: "Usuários",
  },
  {
    MenuIcon: GrUserWorker,
    pageName: "funcionarios",
    href: DEFAULT_URL("funcionarios"),
    menuTitle: "Funcionários",
  },
  {
    MenuIcon: GrAnalytics,
    pageName: "analises",
    href: "/analises",
    menuTitle: "Análises",
  },
] as const;
