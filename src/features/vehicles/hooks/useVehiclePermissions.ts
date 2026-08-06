import { useAuth } from "@/shared/context/AuthContext";
import { SystemRole } from "@/shared/enum/SystemRoleType";
import Vehicle from "@/shared/types/Vehicle";

export function useVehiclePermissions(vehicle?: Vehicle) {
  const { user } = useAuth();

  if (!user) {
    return {
      canAdd: false,
      canEdit: false,
      canDelete: false,
      canUnlink: false,
      canViewAllVehicles: false,
      isOwner: false,
    };
  }

  const isGuard = user.currentRole === SystemRole.GUARD;
  const isParkUser = user.currentRole === SystemRole.PARK;
  const isAdmin = user.currentRole === SystemRole.ADMIN;

  const isOwner =
    user.uuid === vehicle?.vehicleUsers?.find((vehicleUser) => vehicleUser.isOwner)?.userUuid;

  return {
    canAdd: isParkUser || isAdmin,
    canEdit: isGuard || isAdmin || isOwner,
    canDelete: isOwner,
    canUnlink: isParkUser && !isOwner,
    canViewAllVehicles: isGuard || isAdmin,
    isOwner,
  };
}
