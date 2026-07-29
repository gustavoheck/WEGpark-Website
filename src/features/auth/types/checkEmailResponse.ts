import { UserRoleType } from "@/shared/enum/UserRole";

export interface CheckEmailResponse {
  roles: UserRoleType[];
}