import VehicleCardButton from "@/features/vehicles/components/atoms/VehicleCardButton";
import { ElementType } from "react";

interface AdminUserCardButtonProps {
  title: string;
  Icon: ElementType;
  href?: string;
  destructive?: boolean;
  variant?: "last";
}

export function AdminUserCardButton({ title, Icon, href, destructive, variant }: AdminUserCardButtonProps) {
  return (
    <VehicleCardButton title={title} Icon={Icon} href={href} destructive={destructive} variant={variant} />
  );
}
