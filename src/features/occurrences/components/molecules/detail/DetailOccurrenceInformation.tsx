import OccurrenceDetailsLabel from "../../atoms/OccurrenceDetailsLabel"

interface DetailOccurrenceInformationPorps {
    label: string
    data: string
}

export default function DetailOccurrenceInformation({ label, data }: DetailOccurrenceInformationPorps) {
    return (
        <div>
            <OccurrenceDetailsLabel text={label} />
            <p className="font-semibold text-base">{data}</p>
        </div>
    )

}