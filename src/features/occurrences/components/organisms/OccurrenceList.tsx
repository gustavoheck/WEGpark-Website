"use client"

import SectionTitle from "@/shared/components/atoms/SectionTitle"
import OccurrenceCard from "../molecules/OccurrenceCard"
import { Occurrence } from "../../types/Occurrence"
import Filter, { FilterParams } from "@/shared/components/molecules/Filter"
import { useGet } from "../../hooks/useGet"
import FilterCategory from "@/shared/types/FilterCategory"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { cn } from "@/shared/lib/utils"
import { useSidebar } from "@/components/ui/sidebar"
import { getOccurrenceConfig } from "../../utils/occurence-helpers"

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
    const { open } = useSidebar();

    function onSubmit(params : FilterParams) {

        if (process.env.NEXT_PUBLIC_USE_MOCKS === "true") {
            const searchTerm = params.value.trim().toLocaleLowerCase();

            if (!searchTerm) {
                setOccurrencesList(initialOccurrences);
                return;
            }

            setOccurrencesList(initialOccurrences.filter((occurrence) => {
                const { defaults } = occurrence;
                const occurrenceType = getOccurrenceConfig(occurrence).label;
                const searchableValues: Record<string, string> = {
                    plate: defaults.vehicle.plate,
                    yearMonth: defaults.dateHour,
                    gate: defaults.gate,
                    occurrenceType,
                    location: defaults.location,
                };

                return searchableValues[params.category]
                    ?.toLocaleLowerCase()
                    .includes(searchTerm);
            }));

            return;
        }

        getOccurrence(
            params,
            {
                onSuccess: (data) => {
                    setOccurrencesList(data)
                },
                onError: () => {
                    alert("Não foi possível filtrar as ocorrências.")
                }
            }
        )
    }
    return (
        <section>
            <SectionTitle text="ocorrências" />
            <Filter filters={filtersObject} onSubmit={onSubmit} />
            <div className="flex flex-col gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {occurrencesList.map((occurrence) => {
                    return <OccurrenceCard key={occurrence.uuid} occurrence={occurrence} />
                })}
            </div>
            <Link href="/ocorrencias/cadastrar">
                <Button className={cn("fixed bottom-4 right-4 text-xl rounded-sm py-6 font-bold z-50", open ? "left-68" : "left-4")} variant="default">
                    <Plus className="size-7" />
                    Cadastrar Ocorrência
                </Button>
            </Link>
        </section>
    )
}
