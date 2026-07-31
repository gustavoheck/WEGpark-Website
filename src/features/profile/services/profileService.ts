
import { api } from "@/shared/lib/api";
import { UserProfileDTO, UpdateProfileRequestDTO } from "../types/User";
import * as mockService from "./profileService.mock";

const USE_MOCKS = true;

export async function getProfile(): Promise<UserProfileDTO> {
    if (USE_MOCKS) return mockService.getProfile();

    const { data } = await api.get<UserProfileDTO>("/users/me");
    return data;
}

export async function updateProfile(profileData: UpdateProfileRequestDTO): Promise<UserProfileDTO> {
    if (USE_MOCKS) return mockService.updateProfile(profileData);

    const { data } = await api.put<UserProfileDTO>("/users/me", profileData);
    return data;
}