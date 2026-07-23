import { api } from "@/shared/lib/api";
import {
  CheckEmailRequestDTO,
  CheckEmailResponseDTO,
  LoginRequestDTO,
  LoginResponseDTO,
} from '../types/Login';

export async function checkEmailAccounts(
    payload: CheckEmailRequestDTO
): Promise<CheckEmailResponseDTO> {
  const { data } = await api.post<CheckEmailResponseDTO>("/auth/verifica-email", payload);
  return data;
}

export async function loginUser(
    payload: LoginRequestDTO
): Promise<LoginResponseDTO> {
  const { data } = await api.post<LoginResponseDTO>('/auth/login', payload);
  return data;
}