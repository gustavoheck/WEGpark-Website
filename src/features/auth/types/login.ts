import { UserRoleType } from "@/shared/enum/UserRole";

export interface LoginRequest {
  email: string;
  password: string;
  role: UserRoleType;
}

export interface LoginResponse {
  authenticated: boolean;
  message: string;
  token: string;
}