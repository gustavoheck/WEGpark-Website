import { useAuth } from "@/shared/context/AuthContext";
import { UserRole } from "@/shared/enum/UserRole";

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

    const isAdmin = user.currentRole === UserRole.ROLE_ADMIN;

    return {
        canAdd: isAdmin,
        canEdit: isAdmin,
        canDelete: isAdmin,
        canView: isAdmin,
    };
}