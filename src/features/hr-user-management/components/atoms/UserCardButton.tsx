// features/hr-user-management/components/atoms/UserCardButton.tsx
import { Button } from "@/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { cva } from "class-variance-authority";
import Link from "next/link";
import { ElementType } from "react";

const gridVariants = cva("", {
    variants: {
        variant: {
            default: "",
            last: "last:odd:col-span-2",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

interface UserCardButtonProps {
    title: string;
    href?: string;
    tone?: "destructive" | "primary";
    variant?: "last";
    Icon: ElementType;
    onClick?: () => void;
    disabled?: boolean;
}

export default function UserCardButton({ title, href, Icon, tone, onClick, disabled, variant }: UserCardButtonProps) {
    const buttonVariant = tone === "destructive" ? "destructive" : tone === "primary" ? "default" : "outline";

    if (href) {
        return (
            <Button asChild variant={buttonVariant} className={cn("h-11 text-md font-medium capitalize", gridVariants({ variant }))}>
                <Link href={href}>
                    <Icon className="size-5" />
                    {title}
                </Link>
            </Button>
        );
    }

    return (
        <Button
            type="button"
            variant={buttonVariant}
            disabled={disabled}
            onClick={onClick}
            className={cn("h-11 text-md font-medium capitalize", gridVariants({ variant }))}
        >
            <Icon className="size-5" />
            {title}
        </Button>
    );
}