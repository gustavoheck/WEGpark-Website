import { Profile } from "../types/Profile";
import {
  CollaboratorProfileRequest,
  VisitorProfileRequest,
} from "../types/ProfileRequest";
import {
  CollaboratorProfileResponse,
  ProfileResponse,
  VisitorProfileResponse,
} from "../types/ProfileResponse";

function getDefaults(response: ProfileResponse) {
  return response.defaults ?? response.parkUserDefaults;
}

function isVisitorResponse(
  response: ProfileResponse,
): response is VisitorProfileResponse {
  return (
    "company" in response || "companyName" in response || "cpf" in response
  );
}

export function mapProfileResponse(response: ProfileResponse): Profile {
  const defaults = getDefaults(response);

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

export function mapProfileUpdate(
  profile: Profile,
): CollaboratorProfileRequest | VisitorProfileRequest {
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
