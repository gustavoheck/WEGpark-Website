import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/shared/components/organisms/AppSidebar";
import Header from "@/shared/components/organisms/Header";
import { getSidebarItems } from "@/shared/config/sidebar";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const sidebarItems = getSidebarItems('parkuser')

    return (
        <SidebarProvider>
            <AppSidebar menuItems={sidebarItems} />
            <SidebarInset>
                <Header />
                <main>
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}