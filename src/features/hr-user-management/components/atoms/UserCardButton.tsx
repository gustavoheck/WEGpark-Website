// features/hr-user-management/components/atoms/UserCardButton.tsx
import { Button } from "@/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { cva } from "class-variance-authority";
import Link from "next/link";
import { ElementType } from "react";

const buttonVariants = cva(
    "flex justify-center items-center gap-2 h-11 text-md font-medium capitalize",
    {
        variants: {
            variant: {
                default: "",
                last: "last:odd:col-span-2",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
);

interface UserCardButtonProps {
    title: string;
    href?: string;
    destructive?: boolean;
    variant?: "last";
    Icon: ElementType;
    onClick?: () => void;
}

export default function UserCardButton({ title, href = "", Icon, destructive = false, onClick, variant }: UserCardButtonProps) {
    return (
        <Button asChild variant={destructive ? "destructive" : "outline"} className={cn(buttonVariants({ variant }))} onClick={onClick}>
            <Link href={href}>
                <Icon className={`size-5 ${!destructive ? "text-foreground" : ""}`} />
                {title}
            </Link>
        </Button>
    );
}