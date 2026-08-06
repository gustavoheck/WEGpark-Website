"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Occurrence } from "../../types/occurrence.type";
import DateHour from "@/shared/components/atoms/DateHour";
import { getOccurrenceConfig } from "../../utils/occurence-helpers";
import OccurrenceDetailsLabel from "../atoms/OccurrenceDetailsLabel";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import OccurrenceSpecificDetail from "./OccurrenceSpecificDetail";
import DetailOccurrenceInformation from "./DetailOccurrenceInformation";

interface DetailOccurence {
    occurrence: Occurrence
}

export default function DetailOccurence({ occurrence }: DetailOccurence) {
    const { label } = getOccurrenceConfig(occurrence)

    const [isExpanded, setIsExpanded] = useState(false)

    const { dateHour, location, gate, vehicle, guard } = occurrence.defaults
    const { plate, brand, model, color } = vehicle

    return (
        <Card className="mb-8">
            <CardHeader>
                <h2 className="font-medium text-2xl text-center text-primary">{label}</h2>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 px-0">
                <div className="px-4 flex flex-col gap-2">
                    <div>
                        <OccurrenceDetailsLabel text="Data de Registro" />
                        <DateHour dateHour={dateHour} />
                    </div>
                    <DetailOccurrenceInformation label="Local" data={location} />
                    <DetailOccurrenceInformation label="Portaria" data={gate} />
                    <DetailOccurrenceInformation label="Guarda" data={guard} />
                </div>
                <Collapsible open={isExpanded} onOpenChange={setIsExpanded} className="flex flex-col gap-2">
                    <CollapsibleTrigger className="w-fit flex items-center gap-2 px-4" onClick={() => setIsExpanded(!isExpanded)}>
                        <OccurrenceDetailsLabel text="Veículo" />
                        <ChevronRight className={`size-5 text-primary ${isExpanded ? "rotate-90" : "rotate-0"} transition-all`} />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <div className="flex flex-col gap-3 bg-muted/50 p-4 shadow-inner border-b-2 border-muted">
                            <DetailOccurrenceInformation label="Placa" data={plate} />
                            <DetailOccurrenceInformation label="Marca" data={brand} />
                            <DetailOccurrenceInformation label="Modelo" data={model} />
                            <DetailOccurrenceInformation label="Cor" data={color} />
                        </div>
                    </CollapsibleContent>
                </Collapsible>
                <div className="flex flex-col gap-2">
                    <OccurrenceSpecificDetail occurrence={occurrence} />
                </div>
            </CardContent>
        </Card>
    )

}

