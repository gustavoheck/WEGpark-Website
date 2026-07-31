import { api } from "@/shared/lib/api";
import { 
    RequestResetCodeRequestDTO,
    VerifyResetCodeRequestDTO,
    VerifyResetCodeResponseDTO,
    ResetPasswordRequestDTO
} from "../types/ResetPasswordResponse";

export async function requestResetCode(
    payload: RequestResetCodeRequestDTO
): Promise<void> {
    await api.post("/recuperar-senha", payload);
}

export async function verifyResetCode(
    payload: VerifyResetCodeRequestDTO
): Promise<VerifyResetCodeResponseDTO> {
    const { data } = await api.post<VerifyResetCodeResponseDTO>(
        "/recuperar-senha/verificar",
        payload
    );
    return data;
}

export async function resetPassword(
    payload: ResetPasswordRequestDTO
): Promise<void> {
    await api.post("/recuperar-senha/redefinir", payload);
}