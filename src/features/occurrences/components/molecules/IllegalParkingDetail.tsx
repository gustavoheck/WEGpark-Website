import { IllegalParking } from "../../types/IllegalParking";
import DetailOccurrenceInformation from "./DetailOccurrenceInformation";
import { PARKING_SPACE_MAP } from "../../enums/parking-space-map";

interface IllegalParkingDetailProps {
    occurrence : IllegalParking
}

export default function IllegalParkingDetail ({occurrence} : IllegalParkingDetailProps) {
    return (
        <div className="px-4">
            <DetailOccurrenceInformation label="Tipo de Vaga" data={PARKING_SPACE_MAP[occurrence.parkingSpaceType]} />
            { occurrence.description && (
                <DetailOccurrenceInformation label="Descrição" data={occurrence.description} />
            )}
        </div>
    )
}