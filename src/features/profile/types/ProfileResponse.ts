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

export type ProfileResponse =
  | CollaboratorProfileResponse
  | VisitorProfileResponse;