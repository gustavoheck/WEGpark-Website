"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Occurrence } from "../../types/occurrence.type";
import DateHour from "@/shared/components/atoms/DateHour";
import { getOccurrenceConfig } from "../../utils/occurence-helpers";
import OccurrenceDetailsLabel from "../atoms/OccurrenceDetailsLabel";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRight, ClipboardList } from "lucide-react";
import { useState } from "react";
import OccurrenceSpecificDetail from "./OccurrenceSpecificDetail";
import DetailOccurrenceInformation from "./DetailOccurrenceInformation";

interface DetailOccurence {
  occurrence: Occurrence;
}

export default function DetailOccurence({ occurrence }: DetailOccurence) {
  const { label } = getOccurrenceConfig(occurrence);

  const [isExpanded, setIsExpanded] = useState(false);

  const { dateHour, location, gate, vehicle, guard } = occurrence.defaults;
  const {
    plate = "Não informado",
    brand = "Não informado",
    model = "Não informado",
    color = "Não informado",
  } = vehicle ?? {};

  return (
    <Card
      size="sm"
      className="mx-auto mb-6 w-full max-w-5xl border-border/70 shadow-sm"
    >
      <CardHeader className="flex flex-row items-center gap-3 border-b bg-muted/20 pb-4">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <ClipboardList className="size-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">{label}</h2>
          <p className="text-sm text-muted-foreground">
            Informações registradas sobre a ocorrência
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 px-3">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-border/60 bg-muted/20 p-3.5">
            <OccurrenceDetailsLabel text="Data de Registro" />
            <DateHour dateHour={dateHour} />
          </div>
          <DetailOccurrenceInformation label="Local" data={location} />
          <DetailOccurrenceInformation label="Portaria" data={gate} />
          <DetailOccurrenceInformation label="Guarda" data={guard} />
        </div>
        <Collapsible
          open={isExpanded}
          onOpenChange={setIsExpanded}
          className="overflow-hidden rounded-xl border border-border/60"
        >
          <CollapsibleTrigger
            className="flex w-full items-center justify-between p-3.5 text-left transition-colors hover:bg-muted/40"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <OccurrenceDetailsLabel text="Veículo" />
            <ChevronRight
              className={`size-5 text-primary ${isExpanded ? "rotate-90" : "rotate-0"} transition-all`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="grid gap-3 border-t bg-muted/20 p-3 sm:grid-cols-2 lg:grid-cols-4">
              <DetailOccurrenceInformation label="Placa" data={plate} />
              <DetailOccurrenceInformation label="Marca" data={brand} />
              <DetailOccurrenceInformation label="Modelo" data={model} />
              <DetailOccurrenceInformation label="Cor" data={color} />
            </div>
          </CollapsibleContent>
        </Collapsible>
        <div className="overflow-hidden rounded-xl border border-border/60">
          <OccurrenceSpecificDetail occurrence={occurrence} />
        </div>
      </CardContent>
    </Card>
  );
}
