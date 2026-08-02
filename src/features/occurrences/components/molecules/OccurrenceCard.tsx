// features/occurrences/components/molecules/OccurrenceCard.tsx
"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ChevronDown, Eye, Pencil } from "lucide-react";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { buttonVariants } from "@/components/ui/button";

import DateHour from "@/shared/components/atoms/DateHour";
import VehicleName from "@/shared/components/atoms/VehicleName";

import { Occurrence } from "../../types/Occurrence";
import { getOccurrenceConfig } from "../../utils/occurence-helpers";
import OccurrenceCardButton from "../atoms/OccurenceCardButton";

interface OccurrenceCardProps {
    occurrence: Occurrence;
}

export default function OccurrenceCard({ occurrence }: OccurrenceCardProps) {
    const { icon: IconComponent } = getOccurrenceConfig(occurrence);
    const { brand, model, ownerId } = occurrence.defaults.vehicle;
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded} className="w-full">
            <Card className="w-full shadow-sm gap-0">
                <div className="flex pl-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <IconComponent className="size-8" />
                    </div>
                    <CardHeader className="w-full">
                        <div>
                            <div className="flex items-center justify-between">
                                <DateHour dateHour={occurrence.defaults.dateHour} />
                                <span>{occurrence.defaults.location}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <VehicleName brand={brand} model={model} />
                                <p>{ownerId}</p>
                            </div>
                        </div>
                    </CardHeader>
                </div>

                <CollapsibleContent className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
                    <CardContent className="py-4 border-t border-dashed bg-muted/20">
                        <div className="grid grid-cols-2 gap-3 w-full">
                            <OccurrenceCardButton title="ver dados" Icon={Eye} href={`/ocorrencias/${occurrence.uuid}`} />
                            <OccurrenceCardButton title="editar" Icon={Pencil} href={`/ocorrencias/${occurrence.uuid}/editar`} />
                        </div>
                    </CardContent>
                </CollapsibleContent>

                <CardFooter className="bg-muted/50 border-t p-3 flex justify-center">
                    <CollapsibleTrigger
                        className={buttonVariants({
                            variant: "ghost",
                            className: "w-full font-bold text-primary flex items-center justify-center gap-2 aria-expanded:text-primary aria-expanded:bg-transparent hover:text-primary hover:bg-transparent",
                        })}
                    >
                        <span className="text-lg">{isExpanded ? "Ver Menos" : "Ver Mais"}</span>
                        <ChevronDown className={`size-5 transition-transform duration-300 ${isExpanded ? "rotate-180" : "rotate-0"}`} />
                    </CollapsibleTrigger>
                </CardFooter>
            </Card>
        </Collapsible>
    );
}