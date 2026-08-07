import { IllegalParking } from "../../types/occurrence.type";
import DetailOccurrenceInformation from "./DetailOccurrenceInformation";
import { PARKING_SPACE_MAP } from "../../enums/parking-space-map";

interface IllegalParkingDetailProps {
  occurrence: IllegalParking;
}

export default function IllegalParkingDetail({
  occurrence,
}: IllegalParkingDetailProps) {
  return (
    <div className="grid gap-3 p-3 sm:grid-cols-2">
      <DetailOccurrenceInformation
        label="Tipo de Vaga"
        data={PARKING_SPACE_MAP[occurrence.parkingSpaceType]}
      />
      {occurrence.description && (
        <DetailOccurrenceInformation
          label="Descrição"
          data={occurrence.description}
        />
      )}
    </div>
  );
}
