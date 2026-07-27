import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton } from "../../../components/ui/sidebar";
import SidebarItem from "@/shared/types/SidebarItem";
import UserMock from "@/shared/mocks/UserMock";
import Profile from "../molecules/Profile";
import Link from "next/link";

interface AppSidebarProps {
  menuItems: SidebarItem[]
}

export function AppSidebar({ menuItems }: AppSidebarProps) {

  const username = UserMock.name

  return (
    <Sidebar>

      <SidebarHeader>
        <Profile username={username} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                return (
                  <SidebarMenuButton key={item.title} asChild size="xl" className="transition-colors">
                    <Link href={item.href} className="flex gap-2">
                      <item.icon className="size-7" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}