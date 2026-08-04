import { CollaboratorProfileRequest, VisitorProfileRequest } from "../types/ProfileRequest";
import { Profile } from "../types/Profile";
import { ProfileResponse } from "../types/ProfileResponse";

export function mapProfileResponse(response: ProfileResponse): Profile {
  const { defaults } = response;
  if (defaults.userType === "VISITOR") {
    const visitor = response as Extract<ProfileResponse, { company: string }>;
    return { uuid: defaults.uuid, email: defaults.email, telephone: defaults.telephone, name: defaults.name, parkUserType: "VISITOR", companyName: visitor.company, cpf: visitor.cpf };
  }
  const collaborator = response as Extract<ProfileResponse, { badgeNumber: string }>;
  return { uuid: defaults.uuid, email: defaults.email, telephone: defaults.telephone, name: defaults.name, parkUserType: "COLLABORATOR", badgeNumber: collaborator.badgeNumber, department: collaborator.location };
}

export function mapProfileUpdate(profile: Profile): CollaboratorProfileRequest | VisitorProfileRequest {
  if (profile.parkUserType === "VISITOR") return { defaults: { name: profile.name, telephone: profile.telephone }, company: profile.companyName, cpf: profile.cpf };
  return { defaults: { name: profile.name, telephone: profile.telephone }, badgeNumber: profile.badgeNumber, location: profile.department };
}
