import { api } from "@/shared/lib/api";
import { ParkUserType } from "@/shared/enum/ParkUserType";

import {
  AuthAccount,
  CheckAccountRequest,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ResendEmailRequest,
  ResetPasswordAnswerRequest,
  ResetPasswordAnswerResponse,
  ResetPasswordCheckRequest,
  ResetPasswordCheckResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from "../types/auth.type";

export async function register(
  request: RegisterRequest,
  userType: ParkUserType,
): Promise<RegisterResponse> {
  const { data } = await api.post<RegisterResponse>(
    "/auth/register/" + ParkUserType[userType].toLowerCase(),
    request,
  );

  return data;
}

export async function authAccountRoles(
  request: CheckAccountRequest,
): Promise<AuthAccount[]> {
  const { data } = await api.post<AuthAccount[]>("/auth", request);

  return data;
}

export async function login(request: LoginRequest): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>("/auth/login", request);

  return data;
}

export async function resetPasswordCheck(
  request: ResetPasswordCheckRequest,
): Promise<ResetPasswordCheckResponse> {
  const { data } = await api.post<ResetPasswordCheckResponse>(
    "/auth/reset-password/check-email",
    request,
  );

  return data;
}

export async function resetPasswordAnswer(
  request: ResetPasswordAnswerRequest,
): Promise<ResetPasswordAnswerResponse> {
  const { data } = await api.post<ResetPasswordAnswerResponse>(
    "/auth/reset-password/check-email/answer",
    request,
  );

  return data;
}

export async function resetPassword(
  request: ResetPasswordRequest,
): Promise<ResetPasswordResponse> {
  const { data } = await api.patch<ResetPasswordResponse>(
    "/auth/reset-password",
    request,
  );

  return data;
}

export async function resendEmail(request: ResendEmailRequest): Promise<void> {
  await api.post("/auth/resend-email", request);
}
