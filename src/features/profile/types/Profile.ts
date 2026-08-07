interface BaseProfile {
  uuid: string;
  email: string;
  telephone: string;
  name: string;
}

export interface CollaboratorProfile extends BaseProfile {
  parkUserType: "COLLABORATOR";
  badgeNumber: string;
  department: string;
}

export interface VisitorProfile extends BaseProfile {
  parkUserType: "VISITOR";
  companyName: string;
  cpf: string;
}

export interface RhProfile extends BaseProfile {
  parkUserType: "RH";
  badgeNumber: string;
}

export interface GuardProfile extends BaseProfile {
  parkUserType: "GUARD";
  badgeNumber: string;
  location: string;
  boss: string;
}

export type Profile =
  | CollaboratorProfile
  | VisitorProfile
  | GuardProfile
  | RhProfile;
