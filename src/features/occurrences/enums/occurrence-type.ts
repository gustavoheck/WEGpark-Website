export const OccurrenceType = {
  WARNING: "WARNING",
  TRAFFIC_ACCIDENT: "TRAFFIC_ACCIDENT",
  ILLEGAL_PARKING : "ILLEGAL_PARKING"
} as const;

export type OccurrenceType =
  (typeof OccurrenceType)[keyof typeof OccurrenceType];