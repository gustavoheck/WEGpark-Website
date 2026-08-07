import { ParkUserType } from "@/shared/enum/ParkUserType";

interface ParkUserDefaults {
  uuid: string;
  email: string;
  telephone: string;
  name: string;
  active: boolean;
  userType: ParkUserType;
}

export interface CollaboratorProfileResponse {
  defaults?: ParkUserDefaults;
  parkUserDefaults?: ParkUserDefaults;
  badgeNumber?: string;
  location?: string;
  department?: string;
}

export interface VisitorProfileResponse {
  defaults?: ParkUserDefaults;
  parkUserDefaults?: ParkUserDefaults;
  company?: string;
  companyName?: string;
  cpf?: string;
}

export interface GuardProfileResponse {
  defaults?: ParkUserDefaults;
  parkUserDefaults?: ParkUserDefaults;
  badgeNumber?: string;
  location?: string;
  boss?: string;
}

export interface RhProfileResponse {
  uuid: string;
  email?: string | null;
  telephone?: string | null;
  name?: string | null;
  badgeNumber?: string | null;
}

export type ParkProfileResponse =
  | CollaboratorProfileResponse
  | VisitorProfileResponse
  | GuardProfileResponse;

export type ProfileResponse = ParkProfileResponse | RhProfileResponse;
