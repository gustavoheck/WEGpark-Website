import type { OccurrenceType } from "../schemas/OccurrenceSchema";

export type OccurrenceFormInput = {
  plate: string;
  location: string;
  gate: string;
  occurrenceType?: OccurrenceType;

  warningType?: string;
  parkingSpaceType?: string;
  description?: string;

  occurrenceDate?: string;
  victimName?: string;
  responsibleBossName?: string;
  responsibleFactory?: string;
  responsibleSection?: string;
  trafficOccurrenceType?: string;
  guardTestimony?: string;
  victimTestimony?: string;
};