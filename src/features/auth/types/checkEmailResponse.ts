import { UserRoleType } from "@/shared/enum/UserRole";

export interface SelectAccountResponse {
  role: UserRoleType;
}

export type CheckEmailResponse = SelectAccountResponse[];