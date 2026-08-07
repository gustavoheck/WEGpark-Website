import { BaseWarning } from "../../types/occurrence.type";
import DetailOccurrenceInformation from "./DetailOccurrenceInformation";
import { WARNING_TYPE_MAP } from "../../enums/warning-type";

interface WarningDetailProps {
  occurrence: BaseWarning;
}

export default function WarningDetail({ occurrence }: WarningDetailProps) {
  return (
    <div className="grid gap-3 p-3 sm:grid-cols-2">
      <DetailOccurrenceInformation
        label="Tipo do Aviso"
        data={WARNING_TYPE_MAP[occurrence.warningType]}
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
