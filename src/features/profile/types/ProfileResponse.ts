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
  defaults: ParkUserDefaults;
  badgeNumber: string;
  location: string;
}

export interface VisitorProfileResponse {
  defaults: ParkUserDefaults;
  company: string;
  cpf: string;
}

export type ProfileResponse =
  | CollaboratorProfileResponse
  | VisitorProfileResponse;
