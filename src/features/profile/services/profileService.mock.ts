// features/profile/services/profileService.mock.ts
import { CollaboratorProfileRequest, VisitorProfileRequest } from "../types/ProfileRequest";
import { ProfileResponse } from "../types/ProfileResponse";

let mockProfile: ProfileResponse = {
    defaults: { uuid: "2", email: "visitante@exemplo.com", telephone: "(11) 98765-4321", name: "Maria Souza", active: true, userType: "VISITOR" },
    company: "Empresa XYZ",
    cpf: "123.456.789-00",
};

function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getProfile(): Promise<ProfileResponse> {
    await delay(600);
    return mockProfile;
}

export async function updateProfile(profileData: CollaboratorProfileRequest | VisitorProfileRequest): Promise<ProfileResponse> {
    await delay(600);

    if ("company" in profileData || "companyName" in profileData || "cpf" in profileData) {
        mockProfile = {
            defaults: {
                ...mockProfile.defaults,
                ...profileData.defaults,
                ...profileData.parkUserDefaults,
            },
            company: (profileData as VisitorProfileRequest).company ?? (profileData as VisitorProfileRequest).companyName,
            companyName: (profileData as VisitorProfileRequest).companyName,
            cpf: (profileData as VisitorProfileRequest).cpf,
        } as ProfileResponse;
    } else {
        mockProfile = {
            defaults: {
                ...mockProfile.defaults,
                ...profileData.defaults,
                ...profileData.parkUserDefaults,
            },
            badgeNumber: (profileData as CollaboratorProfileRequest).badgeNumber,
            location: (profileData as CollaboratorProfileRequest).location,
            department: (profileData as CollaboratorProfileRequest).department,
        } as ProfileResponse;
    }

    return mockProfile;
}