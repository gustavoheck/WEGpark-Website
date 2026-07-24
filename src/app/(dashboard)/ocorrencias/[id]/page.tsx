import DetailOccurence from "@/features/occurrences/components/molecules/DetailOccurence";
import OccurrencesListMock from "@/features/occurrences/mocks/OccurrenceListMock";
import BackButton from "@/shared/components/atoms/BackButton";
import SectionTitle from "@/shared/components/atoms/SectionTitle";
import { notFound } from "next/navigation";

interface OccurrencesProps {
    params: Promise<{ id: string }>;
}


export default async function Occurrences({ params }: OccurrencesProps) {

    const { id } = await params;
    const occurrence = OccurrencesListMock.find((o) => o.uuid === id);

    if (!occurrence) {
        notFound()
    }

    return (
        <section>
            <div className="flex items-center w-full pt-8 pb-10 gap-3 relative justify-center">
                <BackButton />
                <SectionTitle text="detalhes ocorrência" className="py-0"/>
            </div>

            <DetailOccurence occurrence={occurrence} />
        </section>

    )
}