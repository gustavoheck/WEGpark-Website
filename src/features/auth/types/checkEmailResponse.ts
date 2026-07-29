import { UserRoleType } from "@/shared/enum/UserRole";

export interface CheckEmailResponse {
  map(arg0: (item: any) => any): unknown;
  role: UserRoleType[];
}