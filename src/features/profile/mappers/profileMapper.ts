import { GuardProfile, Profile, RhProfile } from "../types/Profile";
import {
  ProfileRequest,
  RhProfileRequest,
} from "../types/ProfileRequest";
import {
  CollaboratorProfileResponse,
  GuardProfileResponse,
  ParkProfileResponse,
  RhProfileResponse,
  VisitorProfileResponse,
} from "../types/ProfileResponse";

function getDefaults(response: ParkProfileResponse) {
  return response.defaults ?? response.parkUserDefaults;
}

function isVisitorResponse(
  response: ParkProfileResponse,
): response is VisitorProfileResponse {
  return (
    "company" in response || "companyName" in response || "cpf" in response
  );
}

export function mapProfileResponse(response: ParkProfileResponse): Profile {
  const defaults = getDefaults(response);

  if (defaults?.userType === "GUARD") {
    const guardResponse = response as GuardProfileResponse;

    return {
      uuid: defaults.uuid,
      email: defaults.email,
      telephone: defaults.telephone,
      name: defaults.name,
      parkUserType: "GUARD",
      badgeNumber: guardResponse.badgeNumber ?? "",
      location: guardResponse.location ?? "",
      boss: guardResponse.boss ?? "",
    } satisfies GuardProfile;
  }

  if (
    defaults?.userType === "VISITOR" ||
    (isVisitorResponse(response) &&
      Boolean(response.company ?? response.companyName ?? response.cpf))
  ) {
    const visitorResponse = response as VisitorProfileResponse;

    return {
      uuid: defaults?.uuid ?? "",
      email: defaults?.email ?? "",
      telephone: defaults?.telephone ?? "",
      name: defaults?.name ?? "",
      parkUserType: "VISITOR",
      companyName: visitorResponse.company ?? visitorResponse.companyName ?? "",
      cpf: visitorResponse.cpf ?? "",
    };
  }

  const collaboratorResponse = response as CollaboratorProfileResponse;

  return {
    uuid: defaults?.uuid ?? "",
    email: defaults?.email ?? "",
    telephone: defaults?.telephone ?? "",
    name: defaults?.name ?? "",
    parkUserType: "COLLABORATOR",
    badgeNumber: collaboratorResponse.badgeNumber ?? "",
    department:
      collaboratorResponse.location ?? collaboratorResponse.department ?? "",
  };
}

export function mapRhProfileResponse(response: RhProfileResponse): RhProfile {
  return {
    uuid: response.uuid,
    email: response.email ?? "",
    telephone: response.telephone ?? "",
    name: response.name ?? "",
    parkUserType: "RH",
    badgeNumber: response.badgeNumber ?? "",
  };
}

export function mapProfileUpdate(
  profile: Profile,
): ProfileRequest {
  if (profile.parkUserType === "RH") {
    const request: RhProfileRequest = {
      telephone: profile.telephone,
      name: profile.name,
      badgeNumber: profile.badgeNumber,
    };

    return request;
  }

  if (profile.parkUserType === "GUARD") {
    throw new Error("A atualização do perfil da guarita não é suportada pela API.");
  }

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
