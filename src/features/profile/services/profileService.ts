// features/profile/services/profileService.ts
import { api } from "@/shared/lib/api";
import * as mockService from "./profileService.mock";
import { CollaboratorProfileRequest, VisitorProfileRequest } from "../types/ProfileRequest";
import { ProfileResponse } from "../types/ProfileResponse";
import { Profile } from "../types/Profile";
import { mapProfileResponse } from "../mappers/profileMapper";

const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === "true";

export async function getProfile(): Promise<Profile> {
    if (USE_MOCKS) return mapProfileResponse(await mockService.getProfile());

    const { data } = await api.get<ProfileResponse>("/park/profile");
    return mapProfileResponse(data);
}

export async function updateProfile(profileData: CollaboratorProfileRequest | VisitorProfileRequest): Promise<Profile> {
    if (USE_MOCKS) return mapProfileResponse(await mockService.updateProfile(profileData));

    const endpoint = "company" in profileData ? "/park/profile/visitor" : "/park/profile/collaborator";
    const { data } = await api.patch<ProfileResponse>(endpoint, profileData);
    return mapProfileResponse(data);
}
