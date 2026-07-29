"use client"

import OccurrenceCard from "../molecules/OccurrenceCard"
import { Occurrence } from "../../types/Occurrence"

interface OccurrenceListProps {
    occurrences: Occurrence[]
    isLoading : boolean
}

export default function OccurrenceList({ occurrences, isLoading }: OccurrenceListProps) {

    if (isLoading) {
        return (
            <p className="text-center py-8 text-muted-foreground">Carregando ocorrências...</p>
        )
    }

    if (!occurrences || occurrences.length === 0) {
        return (
            <p className="text-center py-8 text-muted-foreground">Nenhuma ocorrência encontrada.</p>
        )
    }

    return (
        <div>
            {occurrences.map((o) => {
                return (
                    <OccurrenceCard key={o.uuid} occurrence={o} />
                )
            })}
        </div>
    )
}
