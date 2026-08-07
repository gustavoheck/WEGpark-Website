// features/profile/services/profileService.ts
import { api } from "@/shared/lib/api";
import { ProfileRequest } from "../types/ProfileRequest";
import { ParkProfileResponse, RhProfileResponse } from "../types/ProfileResponse";
import { Profile } from "../types/Profile";
import { mapProfileResponse, mapRhProfileResponse } from "../mappers/profileMapper";
import { SystemRole, SystemRoleType } from "@/shared/enum/SystemRoleType";
import axios from "axios";

function shouldUseLegacyRhRoute(error: unknown): boolean {
    if (!axios.isAxiosError(error)) return false;

    const status = error.response?.status;
    return status === 403 || status === 404 || status === 405 || Boolean(status && status >= 500);
}

interface RhProfilePageResponse {
    content: RhProfileResponse[];
    totalPages: number;
}

async function findRhProfileByEmail(email: string): Promise<RhProfileResponse> {
    const pageSize = 100;
    let page = 0;
    let totalPages = 1;

    while (page < totalPages) {
        const { data } = await api.get<RhProfilePageResponse>("/rh", {
            params: { page, size: pageSize },
        });
        const profile = data.content.find(
            (item) => item.email?.trim().toLowerCase() === email.trim().toLowerCase(),
        );

        if (profile) return profile;

        totalPages = data.totalPages;
        page += 1;
    }

    throw new Error("Não foi possível localizar o perfil de RH autenticado.");
}

async function getLegacyRhProfile(
    userUuid: string,
    email: string,
): Promise<RhProfileResponse> {
    try {
        const { data } = await api.get<RhProfileResponse>(
            `/rh/user/${userUuid}`,
            { params: { role: SystemRole.RH } },
        );
        return data;
    } catch (error) {
        if (!shouldUseLegacyRhRoute(error)) throw error;
        return findRhProfileByEmail(email);
    }
}

export async function getProfile(
    role: SystemRoleType,
    userUuid: string,
    email: string,
): Promise<Profile> {
    if (role === SystemRole.RH) {
        try {
            const { data } = await api.get<RhProfileResponse>("/rh/me");
            return mapRhProfileResponse(data);
        } catch (error) {
            if (!shouldUseLegacyRhRoute(error)) throw error;
        }

        return mapRhProfileResponse(await getLegacyRhProfile(userUuid, email));
    }

    const { data } = await api.get<ParkProfileResponse>("/park/profile");
    return mapProfileResponse(data);
}

export async function updateProfile(
    profileData: ProfileRequest,
    role: SystemRoleType,
    userUuid: string,
    email: string,
): Promise<Profile> {

    if (role === SystemRole.RH) {
        try {
            await api.patch("/rh/me", profileData);
        } catch (error) {
            if (!shouldUseLegacyRhRoute(error)) throw error;
            const profile = await getLegacyRhProfile(userUuid, email);
            await api.put(`/rh/${profile.uuid}`, profileData);
        }
        return getProfile(role, userUuid, email);
    }

    const endpoint = "company" in profileData ? "/park/profile/visitor" : "/park/profile/collaborator";
    const { data } = await api.patch<ParkProfileResponse>(endpoint, profileData);
    return mapProfileResponse(data);
}
