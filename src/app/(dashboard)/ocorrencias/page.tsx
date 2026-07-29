"use client"

import OccurrenceList from "@/features/occurrences/components/organisms/OccurrenceList";
import { FILTERS } from "@/features/occurrences/constants/filters";
import { useOccurrence } from "@/features/occurrences/hooks/useOccurrence";
import { useOccurrencePermissions } from "@/features/occurrences/hooks/useOccurrencePermissions";
import SectionTitle from "@/shared/components/atoms/SectionTitle";
import Filter, { FilterParams } from "@/shared/components/molecules/Filter";
import { Button } from "@base-ui/react";
import { Link, Plus } from "lucide-react";
import { useState } from "react";

export default function Ocorrencias() {
    const { canAdd } = useOccurrencePermissions()

    const [filterParams, setFilterParams] = useState<FilterParams>()
    const { data: occurrences = [], isLoading } = useOccurrence(filterParams);

    function handleFilterSubmit(params: FilterParams) {
        setFilterParams(params);
    }

    return (
        <section>
            <SectionTitle text="ocorrências" />

            <Filter filters={FILTERS} onSubmit={handleFilterSubmit} />

            <OccurrenceList occurrences={occurrences} isLoading={isLoading} />

            {canAdd && (
                <Link href="/ocorrencias/adicionar">
                    <Button className="fixed bottom-4 left-4 right-4 text-xl rounded-sm py-6 font-bold z-50">
                        <Plus className="size-7" />
                        Cadastrar Ocorrencia
                    </Button>
                </Link>
            )}
        </section>
    )
}
