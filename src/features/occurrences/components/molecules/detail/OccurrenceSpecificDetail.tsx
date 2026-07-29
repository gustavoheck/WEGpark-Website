import { Occurrence } from "../../../types/Occurrence";
import { isIllegalParking, isWarning } from "../../../utils/occurrence-guards";
import IllegalParkingDetail from "./IllegalParkingDetail";
import TraficAccidentDetail from "./TrafficAccidentDetail";
import WarningDetail from "./WarningDetail";

interface OccurrenceSpecificDetailProps {
    occurrence : Occurrence
}

export default function OccurrenceSpecificDetail ({occurrence} : OccurrenceSpecificDetailProps){

    if (isWarning(occurrence)){
        return (
            <WarningDetail occurrence={occurrence} />
        )
    }

    if (isIllegalParking(occurrence)){
        return (
            <IllegalParkingDetail occurrence={occurrence} />
        )
    } else {
        return (
            <TraficAccidentDetail occurrence={occurrence} />
        )
    }
}