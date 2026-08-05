// features/profile/services/profileService.ts
import { api } from "@/shared/lib/api";
import { CollaboratorProfileRequest, VisitorProfileRequest } from "../types/ProfileRequest";
import { ProfileResponse } from "../types/ProfileResponse";
import { Profile } from "../types/Profile";
import { mapProfileResponse } from "../mappers/profileMapper";


export async function getProfile(): Promise<Profile> {

    const { data } = await api.get<ProfileResponse>("/park/profile");
    return mapProfileResponse(data);
}

export async function updateProfile(profileData: CollaboratorProfileRequest | VisitorProfileRequest): Promise<Profile> {

    const endpoint = "company" in profileData ? "/park/profile/visitor" : "/park/profile/collaborator";
    const { data } = await api.patch<ProfileResponse>(endpoint, profileData);
    return mapProfileResponse(data);
}
