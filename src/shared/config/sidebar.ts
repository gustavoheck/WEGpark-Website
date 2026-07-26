import { CarFront, Newspaper, Bell, User, PenBox } from "lucide-react"
import SidebarItem from "@/shared/types/SidebarItem"

const ALL_MENU_ITEMS: Record<string, SidebarItem & { roles: string[] }> = {
  vehicles: {
    title: "veiculos",
    href: "/veiculos",
    icon: CarFront,
    roles: ["parkuser", "guard", "admin"]
  },
  occurrences: {
    title: "ocorrencias",
    href: "/ocorrencias",
    icon: Newspaper,
    roles: ["parkuser", "guard", "admin"]
  },
  notifications: {
    title: "notificações",
    href: "/notificacoes",
    icon: Bell,
    roles: ["parkuser", "guard"]
  },
  profile: {
    title: "dados perfil",
    href: "/profile",
    icon: User,
    roles: ["parkuser", "guard", "rh"]
  },
  requests: {
    title: "solicitações",
    href: "/solicitacoes",
    icon: PenBox,
    roles: ["parkuser"]
  }
}

export function getSidebarItems(userRole: string): SidebarItem[] {
  return Object.values(ALL_MENU_ITEMS)
    .filter(item => item.roles.includes(userRole))
    .map(({ title, href, icon }) => ({ title, href, icon }))
}