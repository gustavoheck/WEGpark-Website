import { BaseWarning } from "../types/BaseWarning";
import { IllegalParking } from "../types/IllegalParking";
import { Occurrence } from "../types/Occurrence";
import { TrafficAccident } from "../types/TrafficAccident";


export function isWarning(occ: Occurrence): occ is BaseWarning {
  return 'warningType' in occ;
}

export function isIllegalParking(occ: Occurrence): occ is IllegalParking {
  return 'parkingSpaceType' in occ;
}

export function isTrafficAccident(occ: Occurrence): occ is TrafficAccident {
  return 'trafficOccurrenceType' in occ;
}