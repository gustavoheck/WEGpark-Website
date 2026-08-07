import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { TrafficAccident } from "../../types/occurrence.type";
import DetailOccurrenceInformation from "./DetailOccurrenceInformation";
import OccurrenceDetailsLabel from "../atoms/OccurrenceDetailsLabel";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

interface TraficAccidentDetailProps {
  occurrence: TrafficAccident;
}

export default function TraficAccidentDetail({
  occurrence,
}: TraficAccidentDetailProps) {
  const {
    occurrenceDate,
    victimName,
    responsibleBossName,
    responsibleFactory,
    responsibleSection,
    trafficOccurrenceType,
    guardTestimony,
    victimTestimony,
  } = occurrence;

  const [isExpandedResponsable, setIsExpandedResponsable] = useState(false);
  const [isExpandedTestimonial, setIsExpandedTestimonial] = useState(false);

  return (
    <>
      <div className="grid gap-3 p-3 sm:grid-cols-2 lg:grid-cols-3">
        <DetailOccurrenceInformation
          label="Tipo de Ocorrência"
          data={trafficOccurrenceType}
        />
        <DetailOccurrenceInformation
          label="Data de Ocorrido"
          data={occurrenceDate}
        />
        <DetailOccurrenceInformation label="Nome da Vítima" data={victimName} />
      </div>

      <Collapsible
        open={isExpandedResponsable}
        onOpenChange={setIsExpandedResponsable}
        className="border-t border-border/60"
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between p-3.5 text-left transition-colors hover:bg-muted/40">
          <OccurrenceDetailsLabel text="Responsáveis" />
          <ChevronRight
            className={`size-5 text-primary ${isExpandedResponsable ? "rotate-90" : "rotate-0"} transition-all`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="grid gap-3 border-t bg-muted/20 p-3 sm:grid-cols-2 lg:grid-cols-3">
            <DetailOccurrenceInformation
              label="Chefe Responsável"
              data={responsibleBossName}
            />
            <DetailOccurrenceInformation
              label="Fábrica Responsável"
              data={responsibleFactory}
            />
            <DetailOccurrenceInformation
              label="Seção Responsável"
              data={responsibleSection}
            />
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible
        open={isExpandedTestimonial}
        onOpenChange={setIsExpandedTestimonial}
        className="border-t border-border/60"
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between p-3.5 text-left transition-colors hover:bg-muted/40">
          <OccurrenceDetailsLabel text="Depoimentos" />
          <ChevronRight
            className={`size-5 text-primary ${isExpandedTestimonial ? "rotate-90" : "rotate-0"} transition-all`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="grid gap-3 border-t bg-muted/20 p-3 sm:grid-cols-2 lg:grid-cols-3">
            <DetailOccurrenceInformation label="Guarda" data={guardTestimony} />
            <DetailOccurrenceInformation
              label="Vítima"
              data={victimTestimony}
            />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
}
