import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

interface FloatingActionLinkProps {
  href: string;
  label: string;
  Icon: LucideIcon;
}

export default function FloatingActionLink({
  href,
  label,
  Icon,
}: FloatingActionLinkProps) {
  return (
    <Link
      href={href}
      className={buttonVariants({
        variant: "default",
        className:
          "fixed inset-x-4 bottom-4 z-50 w-auto max-w-[calc(100vw-2rem)] rounded-sm px-4 py-6 text-base font-bold shadow-lg md:right-4 md:left-auto md:w-fit md:text-xl",
      })}
    >
      <Icon className="size-5 md:size-7" />
      {label}
    </Link>
  );
}
