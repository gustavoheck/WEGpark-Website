import { DefaultOccurence } from "./DefaultOccurence";

export interface TrafficAccident {
  uuid: string;
  defaults: DefaultOccurence;
  occurrenceDate: string;
  victimName: string;
  responsibleBossName: string;
  responsibleFactory: string;
  responsibleSection: string;
  trafficOccurrenceType: string;
  guardTestimony: string;
  victimTestimony: string;
}
