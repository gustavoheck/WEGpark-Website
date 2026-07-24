import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { TrafficAccident } from "../../types/TrafficAccident";
import DetailOccurrenceInformation from "./DetailOccurrenceInformation";
import OccurrenceDetailsLabel from "../atoms/OccurrenceDetailsLabel";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

interface TraficAccidentDetailProps {
    occurrence: TrafficAccident
}

export default function TraficAccidentDetail({ occurrence }: TraficAccidentDetailProps) {

    const { occurrenceDate, victimName, responsibleBossName, responsibleFactory, responsibleSection, trafficOccurrenceType, guardTestimony, victimTestimony } = occurrence

    const [isExpandedResponsable, setIsExpandedResponsable] = useState(false)
    const [isExpandedTestimonial, setIsExpandedTestimonial] = useState(false)

    return (
        <>
            <div className="px-4 flex flex-col gap-2">
                <DetailOccurrenceInformation label="Tipo de Ocorrência" data={trafficOccurrenceType} />
                <DetailOccurrenceInformation label="Data de Ocorrido" data={occurrenceDate} />
                <DetailOccurrenceInformation label="Nome da Vítima" data={victimName} />
            </div>

            <Collapsible open={isExpandedResponsable} onOpenChange={setIsExpandedResponsable} className="flex flex-col gap-2">
                <CollapsibleTrigger className={`px-4 flex items-center gap-2 ${isExpandedResponsable && "pb-4"}`}>
                    <OccurrenceDetailsLabel text="Responsáveis" />
                    <ChevronRight className={`size-5 text-primary ${isExpandedResponsable ? "rotate-90" : "rotate-0"} transition-all`} />
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <div className="flex flex-col gap-3 bg-muted/50 p-4 shadow-inner border-b-2 border-muted">
                        <DetailOccurrenceInformation label="Chefe Responsável" data={responsibleBossName} />
                        <DetailOccurrenceInformation label="Fábrica Responsável" data={responsibleFactory} />
                        <DetailOccurrenceInformation label="Seção Responsável" data={responsibleSection} />
                    </div>
                </CollapsibleContent>
            </Collapsible>

            <Collapsible open={isExpandedTestimonial} onOpenChange={setIsExpandedTestimonial} className={`${isExpandedTestimonial && "mb-8"}`}>
                <CollapsibleTrigger className={`px-4 flex items-center gap-2 ${isExpandedTestimonial && "pb-4"}`}>
                    <OccurrenceDetailsLabel text="Depoimentos" />
                    <ChevronRight className={`size-5 text-primary ${isExpandedTestimonial ? "rotate-90" : "rotate-0"} transition-all`} />
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <div className="flex flex-col gap-3 bg-muted/50 p-4 shadow-inner border-b-2 border-muted">
                        <DetailOccurrenceInformation label="Guarda" data={guardTestimony} />
                        <DetailOccurrenceInformation label="Vítima" data={victimTestimony} />
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </>
    )
}