import { UserRoleType } from "@/shared/enum/UserRole";

interface BaseUserProfile {
  id: string;
  email: string;
  role: UserRoleType;
}

export interface EmployeeProfile extends BaseUserProfile {
  role: "COLLABORATOR" | "RH" | "GUARD";
  name: string;
  department: string;
  badgeNumber: string;
}

export interface VisitorProfile extends BaseUserProfile {
  role: "VISITOR";
  name: string;
  companyName: string;
  cpf: string;
}

// Ou é um, ou é outro
export type UserProfileDTO = EmployeeProfile | VisitorProfile;

export type UpdateEmployeeProfileRequestDTO = Pick<EmployeeProfile, "name" | "department" | "badgeNumber">;
export type UpdateVisitorProfileRequestDTO = Pick<VisitorProfile, "name" | "companyName">;

export type UpdateProfileRequestDTO = UpdateEmployeeProfileRequestDTO | UpdateVisitorProfileRequestDTO;