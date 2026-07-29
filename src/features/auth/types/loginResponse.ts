import { UserRoleType } from "@/shared/enum/UserRole";

export interface LoginResponse {
    token: string;
    role: UserRoleType;
}