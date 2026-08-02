import { ParkUserType } from "@/shared/enum/ParkUserType";
import { SystemRole, SystemRoleType } from "@/shared/enum/SystemRoleType";

interface BaseUserProfile {
  id: string;
  email: string;
  systemRole: SystemRoleType;
  parkUserType: ParkUserType;
}

export interface EmployeeProfile extends BaseUserProfile {
  systemRole: typeof SystemRole.PARK;
  parkUserType: "COLLABORATOR";
  name: string;
  department: string;
  badgeNumber: string;
}

export interface VisitorProfile extends BaseUserProfile {
  systemRole: typeof SystemRole.PARK;
  parkUserType: "VISITOR";
  name: string;
  companyName: string;
  cpf: string;
}

// Ou é um, ou é outro
export type UserProfileDTO = EmployeeProfile | VisitorProfile;

export type UpdateEmployeeProfileRequestDTO = Pick<EmployeeProfile, "name" | "department" | "badgeNumber">;
export type UpdateVisitorProfileRequestDTO = Pick<VisitorProfile, "name" | "companyName">;

export type UpdateProfileRequestDTO = UpdateEmployeeProfileRequestDTO | UpdateVisitorProfileRequestDTO;
