import SectionTitle from "@/shared/components/atoms/SectionTitle"
import { Occurence } from "../../types/Occurence"
import OccurrenceCard from "../molecules/OccurrenceCard"


interface OccurrenceListProps {
    occurrences : Occurence[]
}

export default function OccurrenceList ({occurrences} : OccurrenceListProps) {
    return (
        <section>
            <SectionTitle text="ocorrências"/>
            {occurrences.map((occurrence) => {
                return (
                    <OccurrenceCard key={occurrence.id} occurrence={occurrence} />
                )
            })}
        </section>
    )
}
