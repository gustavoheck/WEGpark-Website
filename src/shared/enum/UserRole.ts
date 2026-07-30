export const UserRole = {
  ROLE_GUARD: "ROLE_GUARD",
  ROLE_RH: "ROLE_RH",
  ROLE_ADMIN: "ROLE_ADMIN",
  ROLE_PARK: "ROLE_PARK",
  ROLE_COLLABORATOR: "ROLE_COLLABORATOR",
  ROLE_VISITOR: "ROLE_VISITOR",
} as const;

export type UserRoleType = (typeof UserRole)[keyof typeof UserRole];