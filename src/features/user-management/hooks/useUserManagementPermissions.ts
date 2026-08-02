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

    const isHR = user.currentRole === SystemRole.RH;

    return {
        canAdd: isHR,
        canEdit: isHR,
        canDelete: isHR,
        canView: isHR,
    };
}
