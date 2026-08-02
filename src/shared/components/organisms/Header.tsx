import { SidebarTrigger } from "../../../components/ui/sidebar";
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <div className="bg-primary flex w-full h-18 items-center justify-between px-2"
        >
            <SidebarTrigger
                variant="none"
                className="h-12 w-12 text-white"
            />
            <Link href="/veiculos">
                <Image src="/assets/images/logo-white.png" alt="Logo of the WEGpark" height={66} width={98} loading="eager" />
            </Link>
            <Link href="/notificacoes" className="flex items-center">
                <Button variant="none">
                    <Bell className="size-7 text-white" />
                </Button>
            </Link>

        </div>
    )
}
