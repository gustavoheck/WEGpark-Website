import { Sidebar, SidebarContent, SidebarHeader, SidebarMenuButton} from "../../../components/ui/sidebar";
import SidebarItem from "@/shared/types/SidebarItem";
import Link from "next/link";
import UserMock from "@/shared/mocks/UserMock";
import Profile from "../molecules/Profile";

interface AppSidebarProps {
  menuItems: SidebarItem[]
}

export function AppSidebar({ menuItems }: AppSidebarProps) {

  const username = UserMock.name

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader>
          <Profile username={username} />
        </SidebarHeader>
        {menuItems.map((item) => {
          return (
            <SidebarMenuButton key={item.title} size="xl" className="transition-colors">
              <Link href={item.href} className="flex gap-2">
                <item.icon className="size-7" /> {item.title}
              </Link>
            </SidebarMenuButton>
          )
        })}
      </SidebarContent>
    </Sidebar>
  )
}