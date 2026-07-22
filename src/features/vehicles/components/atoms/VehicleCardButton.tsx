import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ElementType } from "react"

interface VehicleCardButtonProps {
    title: string,
    href: string,
    Icon: ElementType
    destructive?: boolean
    onClick?: () => void
}

export default function VehicleCardButton({ title, href, Icon, destructive = false, onClick }: VehicleCardButtonProps) {
    return (
        <Button asChild variant={destructive ? "destructive" : "outline"} className="w-full flex justify-center items-center gap-2 h-11 text-md font-medium capitalize last:odd:col-span-2" onClick={onClick}>
            <Link href={href}>
                <Icon className={`size-5 ${!destructive ? "text-foreground" : ""}`} />
                {title}
            </Link>
        </Button>
    )
}