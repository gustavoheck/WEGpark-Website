import { CollaboratorProfileRequest, VisitorProfileRequest } from "../types/ProfileRequest";
import { Profile } from "../types/Profile";
import { ProfileResponse } from "../types/ProfileResponse";

function getDefaults(response: ProfileResponse) {
  return response.defaults ?? response.parkUserDefaults;
}

export function mapProfileResponse(response: ProfileResponse): Profile {
  const defaults = getDefaults(response);
  const userType = defaults?.userType;
  const companyName = (response as any).companyName ?? (response as any).company ?? "";
  const cpf = (response as any).cpf ?? "";
  const badgeNumber = (response as any).badgeNumber ?? "";
  const department = (response as any).department ?? (response as any).location ?? "";

  if (userType === "VISITOR" || companyName || cpf) {
    return {
      uuid: defaults?.uuid ?? "",
      email: defaults?.email ?? "",
      telephone: defaults?.telephone ?? "",
      name: defaults?.name ?? "",
      parkUserType: "VISITOR",
      companyName,
      cpf,
    };
  }

  return {
    uuid: defaults?.uuid ?? "",
    email: defaults?.email ?? "",
    telephone: defaults?.telephone ?? "",
    name: defaults?.name ?? "",
    parkUserType: "COLLABORATOR",
    badgeNumber,
    department,
  };
}

export function mapProfileUpdate(profile: Profile): CollaboratorProfileRequest | VisitorProfileRequest {
  const defaults = { name: profile.name, telephone: profile.telephone };
  const parkUserDefaults = defaults;

  if (profile.parkUserType === "VISITOR") {
    return {
      defaults,
      parkUserDefaults,
      company: profile.companyName,
      companyName: profile.companyName,
      cpf: profile.cpf,
    };
  }

  return {
    defaults,
    parkUserDefaults,
    badgeNumber: profile.badgeNumber,
    location: profile.department,
    department: profile.department,
  };
}