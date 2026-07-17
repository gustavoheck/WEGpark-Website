import { Car } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenuButton, SidebarMenuItem, useSidebar } from "../../../components/ui/sidebar";

 
export function AppSidebar() {

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarMenuButton size="xl" className="text-white">
          <Car className="size-7"/> Veículos
        </SidebarMenuButton>
      </SidebarContent>
    </Sidebar>
  )
}