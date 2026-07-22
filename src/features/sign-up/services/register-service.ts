import { api } from "@/shared/lib/api";
import { 
    RegisterRequestDTO,
    RegisterResponseDTO,
    VerifyEmailRequestDTO,
    VerifyEmailResponseDTO
} from "../types/Register";

export async function registerUser(payload: RegisterRequestDTO): Promise<RegisterResponseDTO> {
    const { data } = await api.post<RegisterResponseDTO>("/cadastro", payload);
    return data;
}

export async function verifyEmailCode(payload: VerifyEmailRequestDTO): Promise<VerifyEmailResponseDTO> {
    const { data } = await api.post<VerifyEmailResponseDTO>("/verifica-email", payload);
    return data;
}

export async function resendVerificationCode(email: string): Promise<void> {
    await api.post("/verifica-email/reenviar", { email });
}