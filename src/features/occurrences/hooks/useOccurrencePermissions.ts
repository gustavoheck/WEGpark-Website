import { useAuth } from "@/shared/context/AuthContext";

export function useOccurrencePermissions () {
    const { user } = useAuth()

    if (!user) {
        return {
            isGuard: false,
        }
    }

    const isGuard = user.currentRole === "GUARD"

    return {
        isGuard 
    }
}