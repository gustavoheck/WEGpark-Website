import { UserRoleType } from "@/shared/enum/UserRole";

export interface LoginRequest {
  email: string;
  password: string;
  role: UserRoleType;
}