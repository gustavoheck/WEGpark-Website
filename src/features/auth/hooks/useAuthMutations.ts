import { useMutation } from "@tanstack/react-query";
import {
  authAccountRoles,
  login,
  register,
  resendEmail,
  resetPassword,
  resetPasswordAnswer,
  resetPasswordCheck,
} from "../services/auth.service";
import {
  AuthAccount,
  CheckAccountRequest,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ResetPasswordAnswerRequest,
  ResetPasswordAnswerResponse,
  ResetPasswordCheckRequest,
  ResetPasswordCheckResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from "../types/auth.type";
import { ParkUserType } from "@/shared/enum/ParkUserType";

// Login

export function useAuthAccountRoles() {
  return useMutation<AuthAccount[], Error, CheckAccountRequest>({
    mutationFn: authAccountRoles,
  });
}

export function useLogin() {
    return useMutation<LoginResponse, Error, LoginRequest>({
        mutationFn: login
    })
}

// Register

export interface RegisterUserMutationParams {
  request: RegisterRequest;
  userType: ParkUserType;
}

export function useRegister() {
  return useMutation<RegisterResponse, Error, RegisterUserMutationParams>({
    mutationFn: ({ request, userType }) => register(request, userType),
  });
}

export function useResendEmail() {
  return useMutation<void, Error, string>({
    mutationFn: (email: string) => resendEmail(email),
  });
}

// Reset Password

export function useResetPasswordCheck() {
  return useMutation<ResetPasswordCheckResponse, Error, ResetPasswordCheckRequest>({
    mutationFn: resetPasswordCheck,
  });
}

export function useResetPasswordAnswer() {
  return useMutation<ResetPasswordAnswerResponse, Error, ResetPasswordAnswerRequest>({
    mutationFn: resetPasswordAnswer,
  });
}

export function useResetPassword() {
  return useMutation<ResetPasswordResponse, Error, ResetPasswordRequest>({
    mutationFn: resetPassword,
  });
}
