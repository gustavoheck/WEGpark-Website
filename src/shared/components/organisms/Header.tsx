import { SidebarTrigger } from "../../../components/ui/sidebar";
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react";
import Image from "next/image";

export default function Header() {
    return (
        <div className="bg-primary flex w-full h-18 items-center justify-between"
        >
            <SidebarTrigger
                variant="ghost"
                className="h-12 w-12 text-white hover:bg-white/10"
            />
            <Image src="/assets/images/logo-white.png" alt="Logo of the WEGpark" height={66} width={98} loading="eager"/>
            <Button variant="ghost" className="text-white hover:bg-white/10">
                <Bell className="size-7" />
            </Button>
        </div>
    )
}