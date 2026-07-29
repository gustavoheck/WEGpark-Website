import { Badge } from "@/components/ui/badge";
import { AdminUserStatus } from "@/features/admin/types/AdminUser";

interface AdminStatusBadgeProps {
  status: AdminUserStatus;
}

export function AdminStatusBadge({ status }: AdminStatusBadgeProps) {
  return (
    <Badge variant={status === "Ativo" ? "default" : "destructive"}>
      {status}
    </Badge>
  );
}
