import { UserRoleType } from "@/shared/enum/UserRole";

// Aux Types

export interface UserBase {
  name: string;
  telephone: string;
}

export interface BaseRequest {
  email: string;
  password: string;
}

// Register

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

// Login

export interface AuthAccount {
  role: UserRoleType;
}

export interface LoginRequest extends BaseRequest {
  role: UserRoleType;
}

export interface LoginResponse {
  authenticated: boolean;
  message: string;
  token: string;
}

// Password Reset

export interface ResetPasswordCheckRequest {
  email: string;
  role: UserRoleType;
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
  role: UserRoleType;
  tokenIfPasswordReset: string;
}

export type ResetPasswordResponse = RegisterResponse
