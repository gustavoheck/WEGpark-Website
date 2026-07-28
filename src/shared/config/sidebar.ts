import {Bell,CarFront,History,LogOut,Newspaper,PenBox, User, Users,
} from "lucide-react";

import SidebarItem from "@/shared/types/SidebarItem";

const ALL_MENU_ITEMS: Record<string, SidebarItem & { roles: string[] }> = {
  vehicles: {
    title: "Veículos",
    href: "/veiculos",
    icon: CarFront,
    roles: ["parkuser", "guard"],
  },

  occurrences: {
    title: "Ocorrências",
    href: "/ocorrencias",
    icon: Newspaper,
    roles: ["parkuser", "guard"],
  },

  notifications: {
    title: "Notificações",
    href: "/notificacoes",
    icon: Bell,
    roles: ["parkuser", "guard"],
  },

  profile: {
    title: "Dados do Perfil",
    href: "/perfil",
    icon: User,
    roles: ["parkuser", "guard", "rh"],
  },

  requests: {
    title: "Solicitações",
    href: "/solicitacoes",
    icon: PenBox,
    roles: ["parkuser"],
  },
};

const ADMIN_MENU: SidebarItem[] = [
  {
    title: "Gestão de Usuários",
    href: "/admin/usuarios",
    icon: Users,
  },
  {
    title: "Histórico Ocorrências",
    href: "/admin/historico",
    icon: History,
  },
  {
    title: "Sair",
    href: "/logout",
    icon: LogOut,
  },
];

export function getSidebarItems(userRole: string): SidebarItem[] {

  if (userRole === "admin") {
    return ADMIN_MENU;
  }

  return Object.values(ALL_MENU_ITEMS)
    .filter((item) => item.roles.includes(userRole))
    .map(({ title, href, icon }) => ({
      title,
      href,
      icon,
    }));
}