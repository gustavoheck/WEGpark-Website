import SectionTitle from "@/shared/components/atoms/SectionTitle"
import OccurrenceCard from "../molecules/OccurrenceCard"
import { Occurrence } from "../../types/Occurrence"


interface OccurrenceListProps {
    occurrences: Occurrence[]
}

export default function OccurrenceList({ occurrences }: OccurrenceListProps) {
    
    return (
        <section>
            <SectionTitle text="ocorrências" />
            <div className="flex flex-col gap-4">
                {occurrences.map((occurrence) => {
                    return (
                        <OccurrenceCard key={occurrence.uuid} occurrence={occurrence} />
                    )
                })}
            </div>

        </section>
    )
}
