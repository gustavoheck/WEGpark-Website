// features/profile/services/profileService.mock.ts
import { CollaboratorProfileRequest, VisitorProfileRequest } from "../types/ProfileRequest";
import { ProfileResponse } from "../types/ProfileResponse";

// "Banco" falso em memória — troca aqui pra testar Colaborador vs Visitante.
// Como updateProfile muda esse objeto (let, não const), as alterações
// persistem entre chamadas dentro da mesma sessão do navegador (some ao dar refresh).
//let mockProfile: UserProfileDTO = {
//    id: "1",
//    email: "colaborador@weg.net",
//    role: "COLABORADOR",
//    name: "João da Silva",
//    department: "TI",
//    badgeNumber: "12345",
//};


 let mockProfile: ProfileResponse = {
     defaults: { uuid: "2", email: "visitante@exemplo.com", telephone: "", name: "Maria Souza", active: true, userType: "VISITOR" },
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

    // Merge simples: sobrescreve só os campos que vieram no update,
    // mantendo id/email/role intactos (o que bate com o UpdateProfileRequestDTO,
    // que nunca inclui esses três).
    mockProfile = { ...mockProfile, ...profileData, defaults: { ...mockProfile.defaults, ...profileData.defaults } } as ProfileResponse;

    return mockProfile;
}
