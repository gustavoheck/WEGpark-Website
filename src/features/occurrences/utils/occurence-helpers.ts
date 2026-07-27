import { OCCURRENCE_UI } from "../constants/occurence-ui";
import { Occurrence } from "../types/Occurrence";
import { isIllegalParking, isWarning } from "./occurrence-guards";


export function getOccurrenceConfig(occurrence: Occurrence) {
  if (isWarning(occurrence)) return OCCURRENCE_UI.WARNING;
  if (isIllegalParking(occurrence)) return OCCURRENCE_UI.ILLEGAL_PARKING;
  
  return OCCURRENCE_UI.TRAFFIC_ACCIDENT;
}