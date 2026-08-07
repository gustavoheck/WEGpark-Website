interface ParkUserDefaultsRequest {
  name: string;
  telephone: string;
}

export interface CollaboratorProfileRequest {
  defaults?: ParkUserDefaultsRequest;
  parkUserDefaults?: ParkUserDefaultsRequest;
  badgeNumber?: string;
  location?: string;
  department?: string;
}

export interface VisitorProfileRequest {
  defaults?: ParkUserDefaultsRequest;
  parkUserDefaults?: ParkUserDefaultsRequest;
  company?: string;
  companyName?: string;
  cpf?: string;
}

export interface RhProfileRequest {
  telephone: string;
  name: string;
  badgeNumber: string;
}

export type ProfileRequest =
  | CollaboratorProfileRequest
  | VisitorProfileRequest
  | RhProfileRequest;
