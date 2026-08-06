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
          "fixed inset-x-4 bottom-4 z-50 h-12 w-auto max-w-[calc(100vw-2rem)] gap-2 rounded-lg px-5 text-base font-bold shadow-md md:static md:ml-auto md:mb-3 md:flex md:w-fit md:max-w-none",
      })}
    >
      <Icon className="size-5" />
      {label}
    </Link>
  );
}
