import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton } from "../../../components/ui/sidebar";
import SidebarItem from "@/shared/types/SidebarItem";
import Profile from "../molecules/Profile";
import Link from "next/link";
import { useAuth } from "@/shared/context/AuthContext";

interface AppSidebarProps {
  menuItems: SidebarItem[]
}

export function AppSidebar({ menuItems }: AppSidebarProps) {

  const { user } = useAuth();

  if (!user){
    return
  }

  return (
    <Sidebar>

      <SidebarHeader>
        <Profile username={user.name } />
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
