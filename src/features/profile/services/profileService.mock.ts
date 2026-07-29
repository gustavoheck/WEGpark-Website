// features/profile/services/profileService.mock.ts
import { UserProfileDTO, UpdateProfileRequestDTO } from "../types/User";

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


 let mockProfile: UserProfileDTO = {
     id: "2",
     email: "visitante@exemplo.com",
     role: "VISITOR",
     name: "Maria Souza",
     companyName: "Empresa XYZ",
     cpf: "123.456.789-00",
 };
function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getProfile(): Promise<UserProfileDTO> {
    await delay(600);
    return mockProfile;
}

export async function updateProfile(profileData: UpdateProfileRequestDTO): Promise<UserProfileDTO> {
    await delay(600);

    // Merge simples: sobrescreve só os campos que vieram no update,
    // mantendo id/email/role intactos (o que bate com o UpdateProfileRequestDTO,
    // que nunca inclui esses três).
    mockProfile = { ...mockProfile, ...profileData } as UserProfileDTO;

    return mockProfile;
}