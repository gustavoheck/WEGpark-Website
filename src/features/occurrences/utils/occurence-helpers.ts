import { OCCURRENCE_UI_CONFIG } from "../config/occurence-ui";
import { Occurrence } from "../types/Occurrence";
import { isIllegalParking, isWarning } from "./occurrence-guards";


export function getOccurrenceConfig(occurrence: Occurrence) {
  if (isWarning(occurrence)) return OCCURRENCE_UI_CONFIG.WARNING;
  if (isIllegalParking(occurrence)) return OCCURRENCE_UI_CONFIG.ILLEGAL_PARKING;
  else return OCCURRENCE_UI_CONFIG.TRAFFIC_ACCIDENT;
}