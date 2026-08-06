"use client";

import { OccurrenceResponse } from "../../types/occurrence.type";
import {
  isIllegalParking,
  isWarning,
} from "../../utils/occurrence-guards";
import EditIllegalParkingOccurrenceForm from "./EditIllegalParkingOccurrenceForm";
import EditTrafficAccidentOccurrenceForm from "./EditTrafficAccidentOccurrenceForm";
import EditWarningOccurrenceForm from "./EditWarningOccurrenceForm";

type EditOccurrenceFormProps = {
  occurrence: OccurrenceResponse;
};

export default function EditOccurrenceForm({
  occurrence,
}: EditOccurrenceFormProps) {
  if (isWarning(occurrence)) {
    return <EditWarningOccurrenceForm occurrence={occurrence} />;
  }

  if (isIllegalParking(occurrence)) {
    return <EditIllegalParkingOccurrenceForm occurrence={occurrence} />;
  }

  return <EditTrafficAccidentOccurrenceForm occurrence={occurrence} />;
}