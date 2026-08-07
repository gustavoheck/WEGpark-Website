"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/shared/context/AuthContext";
import { getProfile } from "../services/profileService";


export function useProfile() {
    const { user } = useAuth();

    return useQuery({
        queryKey: ["profile", user?.uuid, user?.currentRole],
        queryFn: () => getProfile(user!.currentRole, user!.uuid, user!.email),
        enabled: Boolean(user?.uuid),
        staleTime: 1000 * 60 * 5, 
    });
}
