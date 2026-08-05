import Link from "next/link";
import { ElementType } from "react";
import { cva } from "class-variance-authority";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/shared/lib/utils";

const gridVariants = cva(
  "flex h-11 items-center justify-center gap-2 text-md font-medium capitalize",
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

interface OccurrenceCardButtonProps {
  title: string;
  href?: string;
  destructive?: boolean;
  variant?: "last";
  Icon: ElementType;
  onClick?: () => void;
}

export default function OccurrenceCardButton({
  title,
  href,
  Icon,
  destructive = false,
  onClick,
  variant,
}: OccurrenceCardButtonProps) {
  const content = (
    <>
      <Icon className={cn("size-5", !destructive && "text-foreground")} />
      {title}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          buttonVariants({
            variant: destructive ? "destructive" : "outline",
          }),
          gridVariants({ variant }),
        )}
      >
        {content}
      </Link>
    );
  }

  return (
    <Button
      type="button"
      variant={destructive ? "destructive" : "outline"}
      className={gridVariants({ variant })}
      onClick={onClick}
    >
      {content}
    </Button>
  );
}
