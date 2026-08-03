// features/profile/services/profileService.ts
import { api } from "@/shared/lib/api";
import * as mockService from "./profileService.mock";
import { UserProfile } from "../types/User";

const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === "true";

export async function getProfile(): Promise<UserProfile> {
    if (USE_MOCKS) return mockService.getProfile();

    const { data } = await api.get<UserProfile>("/park/profile");
    return data;
}

export async function updateProfile(profileData: UpdateProfileRequest): Promise<UserProfile> {
    if (USE_MOCKS) return mockService.updateProfile(profileData);

    const { data } = await api.patch<UserProfile>("/park/profile/", profileData);
    return data;
}