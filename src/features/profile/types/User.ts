export type UserRole = "COLABORADOR" | "VISITANTE" | "RH" | "GUARITA";

interface BaseUserProfile {
  id: string;
  email: string;
  role: UserRole;
}

export interface EmployeeProfile extends BaseUserProfile {
  role: "COLABORADOR" | "RH" | "GUARITA";
  name: string;
  department: string;
  badgeNumber: string;
}

export interface VisitorProfile extends BaseUserProfile {
  role: "VISITANTE";
  name: string;
  companyName: string;
  cpf: string;
}

// Ou é um, ou é outro
export type UserProfileDTO = EmployeeProfile | VisitorProfile;


export type UpdateEmployeeProfileRequestDTO = Pick<EmployeeProfile, "name" | "department" | "badgeNumber">;
export type UpdateVisitorProfileRequestDTO = Pick<VisitorProfile, "name" | "companyName">;

export type UpdateProfileRequestDTO = UpdateEmployeeProfileRequestDTO | UpdateVisitorProfileRequestDTO;