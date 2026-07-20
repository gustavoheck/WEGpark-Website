import { api } from "@/shared/lib/api";
import { 
    RegisterRequestDTO,
    RegisterResponseDTO,
    VerifyEmailRequestDTO,
    VerifyEmailResponseDTO
} from "../types/register";

export async function registerUser(payload: RegisterRequestDTO): Promise<RegisterResponseDTO> {
    const { data } = await api.post<RegisterResponseDTO>("/auth/cadastro", payload);
    return data;
}

export async function verifyEmailCode(payload: VerifyEmailRequestDTO): Promise<VerifyEmailResponseDTO> {
    const { data } = await api.post<VerifyEmailResponseDTO>("/auth/verifica-email", payload);
    return data;
}

export async function resendVerificationCode(email: string): Promise<void> {
    await api.post("/auth/verifica-email/reenviar", { email });
}