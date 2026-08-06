import { IllegalParkingResponse, OccurrenceResponse, TrafficAccidentResponse, WarningResponse } from "../types/occurrence.type";

export function isWarning(occ: OccurrenceResponse): occ is WarningResponse {
  return 'warningType' in occ;
}

export function isIllegalParking(occ: OccurrenceResponse): occ is IllegalParkingResponse {
  return 'parkingSpaceType' in occ;
}

export function isTrafficAccident(occ: OccurrenceResponse): occ is TrafficAccidentResponse {
  return 'trafficOccurrenceType' in occ;
}