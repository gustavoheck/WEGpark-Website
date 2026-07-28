import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toast";
import { AppSidebar } from "@/shared/components/organisms/AppSidebar";
import Header from "@/shared/components/organisms/Header";
import { getSidebarItems } from "@/shared/config/sidebar";


export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const sidebarItems = getSidebarItems('parkuser')

    return (
        <SidebarProvider defaultOpen={false}>
            <AppSidebar menuItems={sidebarItems} />
            <SidebarInset>
                <Header />
                <main className="px-4">
                    {children}
                </main>
            </SidebarInset>
            <Toaster />
        </SidebarProvider>
    );
}