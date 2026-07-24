import { IllegalParking } from "../../types/IllegalParking";
import { getParkingSpaceLabel } from "../../utils/get-parking-space-label";
import DetailOccurrenceInformation from "./DetailOccurrenceInformation";

interface IllegalParkingDetailProps {
    occurrence : IllegalParking
}

export default function IllegalParkingDetail ({occurrence} : IllegalParkingDetailProps) {

    const {description, parkingSpaceType} = occurrence

    return (
        <div className="px-4">
            <DetailOccurrenceInformation label="Tipo de Vaga" data={getParkingSpaceLabel(parkingSpaceType.parking_space_type)} />
            { description && (
                <DetailOccurrenceInformation label="Descrição" data={description} />
            )}
        </div>
    )
}