"use client"

import SectionTitle from "@/shared/components/atoms/SectionTitle"
import OccurrenceCard from "../molecules/OccurrenceCard"
import { Occurrence } from "../../types/Occurrence"
import Filter, { FilterParams } from "@/shared/components/molecules/Filter"
import { useGet } from "../../hooks/useGet"
import FilterCategory from "@/shared/types/FilterCategory"
import { useState } from "react"


interface OccurrenceListProps {
    occurrences: Occurrence[]
}

const filtersObject: FilterCategory[] = [
    {
        text: "Placa",
        value: "plate"
    },
    {
        text: "Data",
        value: "yearMonth"
    },
    {
        text: "Portaria",
        value: "gate"
    },
    {
        text: "Tipo",
        value: "occurrenceType"
    },
    {
        text: "Local",
        value: "location"
    },
    
]

export default function OccurrenceList({ occurrences : initialOccurrences }: OccurrenceListProps) {

    const [occurrencesList, setOccurrencesList] = useState<Occurrence[]>(initialOccurrences)
    const { mutate: getOccurrence } = useGet()

    function onSubmit(params : FilterParams) {
        getOccurrence(
            params,
            {
                onSuccess: (data) => {
                    setOccurrencesList(data)
                },
                onError: () => {
                    alert("Erro")
                }
            }
        )
    }

    return (
        <section>
            <SectionTitle text="ocorrências" />
            <Filter filters={filtersObject} onSubmit={onSubmit} />
            <div className="flex flex-col gap-4">
                {occurrencesList.map((occurrence) => {
                    return (
                        <OccurrenceCard key={occurrence.uuid} occurrence={occurrence} />
                    )
                })}
            </div>
        </section>
    )
}
