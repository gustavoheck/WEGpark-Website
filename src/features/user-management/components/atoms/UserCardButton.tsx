import Link from "next/link";
import { ElementType } from "react";
import { cva } from "class-variance-authority";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/shared/lib/utils";

const gridVariants = cva("", {
  variants: {
    variant: {
      default: "",
      last: "last:odd:col-span-1 sm:last:odd:col-span-2",
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

export default function UserCardButton({
  title,
  href,
  Icon,
  tone,
  onClick,
  disabled,
  variant,
}: UserCardButtonProps) {
  const visualVariant =
    tone === "destructive"
      ? "destructive"
      : tone === "primary"
        ? "default"
        : "outline";
  const className = cn(
    buttonVariants({ variant: visualVariant }),
    "h-11 text-sm font-medium capitalize sm:text-base",
    gridVariants({ variant }),
  );
  const content = (
    <>
      <Icon className="size-5" />
      {title}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <Button
      type="button"
      variant={visualVariant}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "h-11 text-sm font-medium capitalize sm:text-base",
        gridVariants({ variant }),
      )}
    >
      {content}
    </Button>
  );
}
