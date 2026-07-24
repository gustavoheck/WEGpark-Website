import { BaseWarning } from "../../types/BaseWarning";
import { getWarningTypeLabel } from "../../utils/get-warning-type-label";
import DetailOccurrenceInformation from "./DetailOccurrenceInformation";

interface WarningDetailProps {
    occurrence : BaseWarning
}

export default function WarningDetail ({occurrence} : WarningDetailProps) {

    const {description, warningType} = occurrence

    return (
        <div className="px-4">
            <DetailOccurrenceInformation label="Tipo do Aviso" data={getWarningTypeLabel(warningType.warning_type)} />
            { description && (
                <DetailOccurrenceInformation label="Descrição" data={description} />
            )}
        </div>
    )
}