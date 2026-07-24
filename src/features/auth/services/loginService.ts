import { api } from "@/shared/lib/api";
import {
  CheckEmailRequestDTO,
  CheckEmailResponseDTO,
  LoginRequestDTO,
  LoginResponseDTO,
} from '../types/Login';
import * as mockService from './login-service.mock';

const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === 'true';
console.log("ENV:", process.env.NEXT_PUBLIC_USE_MOCKS);
console.log("USE_MOCKS:", USE_MOCKS);

export async function checkEmailAccounts(
    payload: CheckEmailRequestDTO
): Promise<CheckEmailResponseDTO> {
  if (USE_MOCKS) return mockService.checkEmailAccounts(payload);
  const { data } = await api.post<CheckEmailResponseDTO>("/auth/verifica-email", payload);
  return data;
}

export async function loginUser(
    payload: LoginRequestDTO
): Promise<LoginResponseDTO> {
  if (USE_MOCKS) return mockService.loginUser(payload);
  const { data } = await api.post<LoginResponseDTO>('/auth/login', payload);
  return data;
}