"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/shared/context/AuthContext";
import { updateProfile } from "../services/profileService";

export function useUpdateProfile() {
    const queryClient = useQueryClient();
    const { user } = useAuth();

    return useMutation({
        mutationFn: (profileData: Parameters<typeof updateProfile>[0]) =>
            updateProfile(
                profileData,
                user!.currentRole,
                user!.uuid,
                user!.email,
            ),
        onSuccess: (updatedProfile) => {
            queryClient.setQueryData(
                ["profile", user!.uuid, user!.currentRole],
                updatedProfile,
            );
        },
    });
}
