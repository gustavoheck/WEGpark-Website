import { useAuth } from '@/shared/context/AuthContext';
import { SystemRole } from '@/shared/enum/SystemRoleType';
import Vehicle from '@/shared/types/Vehicle';

export function useVehiclePermissions(vehicle?: Vehicle) {
    const { user } = useAuth();

    if (!user) {
        return {
            canAdd: false,
            canEdit: false,
            canDelete: false,
            canUnlink: false,
            isOwner: false,
            isGuard: false,
        };
    }

    const isGuard = user.currentRole === SystemRole.GUARD
    const isParkUser = user.currentRole === SystemRole.PARK

    const isOwner = isParkUser && Boolean(
        vehicle?.isOwner || user.uuid === vehicle?.ownerId
    )

    return {
        canAdd: isParkUser,
        canEdit: isGuard || isOwner,
        canDelete: isOwner,
        canUnlink: isParkUser && !isOwner,
        isGuard,
        isOwner

    }
}
