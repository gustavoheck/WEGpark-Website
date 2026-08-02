"use client";

import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import BackButton from "@/shared/components/atoms/BackButton";
import SectionTitle from "@/shared/components/atoms/SectionTitle";

import { useOccurrenceByUuid } from "@/features/occurrences/hooks/useOccurrenceByIuid";
import EditOccurrenceForm from "@/features/occurrences/components/organisms/EditOccurenceForm";

export default function EditarOcorrenciaPage() {
    const { id } = useParams<{ id: string }>();
    const { data: occurrence, isPending, isError } = useOccurrenceByUuid(id);

    return (
        <section>
            <div className="flex items-center w-full pt-8 pb-10 gap-3 relative justify-center">
                <BackButton />
                <SectionTitle text="editar ocorrência" className="py-0" />
            </div>

            {isPending && <Skeleton className="h-96 w-full" />}
            {isError && <p className="text-sm text-destructive">Não foi possível carregar a ocorrência.</p>}
            {!isPending && !isError && occurrence && <EditOccurrenceForm occurrence={occurrence} />}
        </section>
    );
}