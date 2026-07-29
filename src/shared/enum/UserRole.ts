export const UserRole = {
  ROLE_COLLABORATOR: "ROLE_COLLABORATOR",
  ROLE_VISITOR: "ROLE_VISITOR",
  ROLE_PARK: "ROLE_PARK",
  ROLE_GUARD: "ROLE_GUARD",
  ROLE_ADMIN: "ROLE_ADMIN",
  ROLE_RH: "ROLE_RH",
} as const;

export type UserRoleType = (typeof UserRole)[keyof typeof UserRole];