interface ParkUserDefaultsRequest {
  name: string;
}

export interface CollaboratorProfileRequest {
  defaults: ParkUserDefaultsRequest;
  badgeNumber: string;
  location: string;
}

export interface VisitorProfileRequest {
  defaults: ParkUserDefaultsRequest;
  company: string;
  cpf: string;
}
