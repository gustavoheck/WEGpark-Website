import { SystemRoleType } from "@/shared/enum/SystemRoleType";

export interface UserBase {
  name: string;
  telephone: string;
}

export interface BaseRequest {
  email: string;
  password: string;
}

export interface CollaboratorRequest {
  defaults: BaseRequest;
  parkUserDefaults: UserBase;
  badgeNumber: string;
  location: string;
}

export interface VisitorRequest {
  defaults: BaseRequest;
  parkUserDefaults: UserBase;
  company: string;
  cpf: string;
}

export type RegisterRequest = CollaboratorRequest | VisitorRequest;

export interface RegisterResponse {
  uuid: string;
  email: string;
}

export interface AuthAccount {
  role: SystemRoleType;
}

export interface CheckAccountRequest {
  email: string;
}

export interface LoginRequest extends BaseRequest {
  role: SystemRoleType;
}

export interface LoginResponse {
  authenticated: boolean;
  message: string;
  token?: string | null;
}

export interface ResendEmailRequest {
  email: string;
}

export interface ResetPasswordCheckRequest {
  email: string;
  role: SystemRoleType;
}

export interface ResetPasswordCheckResponse {
  token: string;
}

export interface ResetPasswordAnswerRequest {
  numberTokenId: string;
  numberCode: string;
}

export interface ResetPasswordAnswerResponse {
  token: string;
}

export interface ResetPasswordRequest extends BaseRequest {
  role: SystemRoleType;
  tokenIfPasswordReset: string;
}

export interface ResetPasswordResponse {
  id: number;
  uuid: string;
  email: string;
}
