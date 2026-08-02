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

    const isAdmin = user.currentRole === SystemRole.ADMIN;

    return {
        canAdd: isAdmin,
        canEdit: isAdmin,
        canDelete: isAdmin,
        canView: isAdmin,
    };
}
