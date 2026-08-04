import { ParkUserType } from "@/shared/enum/ParkUserType";

interface BaseProfile {
  uuid: string;
  email: string;
  telephone: string;
  name: string;
  parkUserType: ParkUserType;
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

export type Profile = CollaboratorProfile | VisitorProfile;
