import { useAuth } from "@/shared/context/AuthContext";
import { SystemRole } from "@/shared/enum/SystemRoleType";

export function useUserManagementPermissions() {
  const { user } = useAuth();

  if (!user) {
    return {
      canAdd: false,
      canEdit: false,
      canDelete: false,
      canView: false,
    };
  }

  const canManageUsers =
    user.currentRole === SystemRole.RH || user.currentRole === SystemRole.ADMIN;

  return {
    canAdd: canManageUsers,
    canEdit: canManageUsers,
    canDelete: canManageUsers,
    canView: canManageUsers,
  };
}
