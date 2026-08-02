export const SystemRole = {
  PARK: "ROLE_PARK",
  GUARD: "ROLE_GUARD",
  RH: "ROLE_RH",
  ADMIN: "ROLE_ADMIN",
} as const;

export type SystemRoleType =
  (typeof SystemRole)[keyof typeof SystemRole];