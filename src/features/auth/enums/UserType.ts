export const ParkUserType = {
  COLLABORATOR: "COLLABORATOR",
  VISITOR: "VISITOR",
} as const;

export type ParkUserType =
  (typeof ParkUserType)[keyof typeof ParkUserType];