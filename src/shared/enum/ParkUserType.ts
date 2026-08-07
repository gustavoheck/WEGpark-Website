export const ParkUserType = {
  COLLABORATOR: "COLLABORATOR",
  VISITOR: "VISITOR",
  GUARD: "GUARD",
} as const;

export type ParkUserType =
  (typeof ParkUserType)[keyof typeof ParkUserType];
