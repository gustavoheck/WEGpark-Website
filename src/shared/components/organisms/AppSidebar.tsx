"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { canAccessRoute } from "@/shared/config/accessControl";
import { useAuth } from "@/shared/context/AuthContext";
import SidebarItem from "@/shared/types/SidebarItem";

import Profile from "../molecules/Profile";

interface AppSidebarProps {
  menuItems: SidebarItem[];
}

export function AppSidebar({ menuItems }: AppSidebarProps) {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) {
    return null;
  }

  function handleLogout() {
    logout();
    router.replace("/login");
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <Profile
          username={user.name}
          href={
            canAccessRoute(user.currentRole, "/perfil") ? "/perfil" : undefined
          }
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.action === "logout" ? (
                    <SidebarMenuButton
                      asChild
                      size="xl"
                      className="transition-colors"
                    >
                      <Link
                        href="/login"
                        className="flex gap-2 text-white"
                        onClick={(event) => {
                          event.preventDefault();
                          handleLogout();
                        }}
                      >
                        <item.icon className="size-7" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  ) : item.href ? (
                    <SidebarMenuButton
                      asChild
                      size="xl"
                      className="transition-colors"
                    >
                      <Link href={item.href} className="flex gap-2">
                        <item.icon className="size-7" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  ) : null}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
