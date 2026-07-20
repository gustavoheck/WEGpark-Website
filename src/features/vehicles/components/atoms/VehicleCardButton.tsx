import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ElementType } from "react"

interface VehicleCardButtonProps {
    title: string,
    href: string,
    Icon: ElementType
    destructive?: boolean
}

export default function VehicleCardButton({ title, href, Icon, destructive = false }: VehicleCardButtonProps) {
    return (
        <Button asChild variant={destructive ? "destructive" : "outline"} className="w-full justify-start gap-2 h-11 text-md font-medium capitalize">
            <Link href={href}>
                <Icon className={`size-5 ${!destructive ? "text-foreground" : ""}`} />
                {title}
            </Link>
        </Button>
    )
}