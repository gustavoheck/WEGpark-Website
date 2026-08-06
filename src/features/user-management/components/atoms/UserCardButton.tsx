import Link from "next/link";
import { ElementType } from "react";
import { cva } from "class-variance-authority";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/shared/lib/utils";

const gridVariants = cva(
  "flex h-10 min-w-0 items-center justify-center gap-2 px-2 text-xs font-medium capitalize min-[380px]:text-sm",
  {
    variants: {
      variant: {
        default: "",
        last: "last:odd:col-span-1 min-[380px]:last:odd:col-span-2",
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
  tone?: "destructive" | "primary";
  variant?: "last";
  Icon: ElementType;
  onClick?: () => void;
  disabled?: boolean;
  compact?: boolean;
}

export default function UserCardButton({
  title,
  href,
  Icon,
  tone,
  onClick,
  disabled,
  variant,
  compact = false,
}: UserCardButtonProps) {
  const visualVariant =
    tone === "destructive"
      ? "destructive"
      : tone === "primary"
        ? "default"
        : "outline";
  const actionClassName = cn(
    gridVariants({ variant }),
    compact && "size-9 p-0",
  );
  const className = cn(
    buttonVariants({ variant: visualVariant }),
    actionClassName,
  );
  const content = (
    <>
      <Icon className="size-4.5" />
      <span className={cn(compact && "sr-only")}>{title}</span>
    </>
  );
  const accessibilityProps = compact
    ? { "aria-label": title, title }
    : undefined;

  if (href) {
    return (
      <Link href={href} className={className} {...accessibilityProps}>
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
      className={actionClassName}
      {...accessibilityProps}
    >
      {content}
    </Button>
  );
}
