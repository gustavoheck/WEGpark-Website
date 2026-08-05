import { ElementType } from "react";
import { cva } from "class-variance-authority";
import Link from "next/link";

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

interface OccurrenceCardButtonProps {
  title: string;
  href?: string;
  destructive?: boolean;
  variant?: "last";
  Icon: ElementType;
  onClick?: () => void;
  compact?: boolean;
}

export default function OccurrenceCardButton({
  title,
  href,
  Icon,
  destructive = false,
  onClick,
  variant,
  compact = false,
}: OccurrenceCardButtonProps) {
  const visualVariant = destructive ? "destructive" : "outline";
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
      <Icon className={cn("size-4.5", !destructive && "text-foreground")} />
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
      className={actionClassName}
      onClick={onClick}
      {...accessibilityProps}
    >
      {content}
    </Button>
  );
}
