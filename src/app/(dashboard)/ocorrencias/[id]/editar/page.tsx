"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import BackButton from "@/shared/components/atoms/BackButton";
import SectionTitle from "@/shared/components/atoms/SectionTitle";

import { useGetOccurrenceById } from "@/features/occurrences/hooks/useOccurrence";
import EditOccurrenceForm from "@/features/occurrences/components/edit/EditOccurrenceForm";

export default function EditarOcorrenciaPage() {
    const { id } = useParams<{ id: string }>();
    const { mutate: getOccurrence, data: occurrence, isPending, isError } = useGetOccurrenceById();

    useEffect(() => {
        getOccurrence(id);
    }, [getOccurrence, id]);

    return (
        <section>
            <div className="flex items-center w-full pt-8 pb-10 gap-3 relative justify-center">
                <BackButton />
                <SectionTitle text="editar ocorrÃªncia" className="py-0" />
            </div>

            {isPending && <Skeleton className="h-96 w-full" />}
            {isError && <p className="text-sm text-destructive">NÃ£o foi possÃ­vel carregar a ocorrÃªncia.</p>}
            {!isPending && !isError && occurrence && <EditOccurrenceForm occurrence={occurrence} />}
        </section>
    );
}

