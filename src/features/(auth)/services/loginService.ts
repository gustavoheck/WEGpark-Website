import { api } from "@/shared/lib/api";
import { LoginFormData } from "../types/LoginSchema";
import { LoginResponseDTO } from "../types/LoginResponse";

export async function loginService(
    credentials: LoginFormData
): Promise<LoginResponseDTO> {
    const { data } = await api.post<LoginResponseDTO>("/auth/login", credentials);
    return data;
}