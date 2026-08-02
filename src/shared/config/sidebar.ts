import {Bell,CarFront,History,LogOut,Newspaper,PenBox, User, Users,
} from "lucide-react";

import SidebarItem from "@/shared/types/SidebarItem";
import { SystemRole, SystemRoleType } from "@/shared/enum/SystemRoleType";

const ALL_MENU_ITEMS: Record<string, SidebarItem & { roles: SystemRoleType[] }> = {
  vehicles: {
    title: "Veículos",
    href: "/veiculos",
    icon: CarFront,
    roles: [SystemRole.PARK, SystemRole.GUARD],
  },

  occurrences: {
    title: "Ocorrências",
    href: "/ocorrencias",
    icon: Newspaper,
    roles: [SystemRole.PARK, SystemRole.GUARD],
  },

  notifications: {
    title: "Notificações",
    href: "/notificacoes",
    icon: Bell,
    roles: [SystemRole.PARK, SystemRole.GUARD],
  },

  profile: {
    title: "Dados do Perfil",
    href: "/perfil",
    icon: User,
    roles: [SystemRole.PARK, SystemRole.GUARD, SystemRole.RH],
  },

  requests: {
    title: "Solicitações",
    href: "/solicitacoes",
    icon: PenBox,
    roles: [SystemRole.PARK],
  },

  logout: {
    title: "Sair",
    href: "/logout",
    icon: LogOut,
    roles: [SystemRole.PARK, SystemRole.GUARD, SystemRole.RH]
  },

  user_management: {
    title: "Gestão de Usuários",
    href: "/gestao-usuarios",
    icon: Users,
    roles: [SystemRole.RH]
  }
};

const ADMIN_MENU: SidebarItem[] = [
  {
    title: "Gestão de Usuários",
    href: "/admin/gestao-usuarios",
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

export function getSidebarItems(userRole: SystemRoleType): SidebarItem[] {

  if (userRole === SystemRole.ADMIN) {
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
