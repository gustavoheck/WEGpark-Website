import { UserRoleType } from "@/shared/enum/UserRole";

export interface LoginResponse {
  authenticated?: boolean;
  message?: string;
  token?: string;
  accessToken?: string;
}