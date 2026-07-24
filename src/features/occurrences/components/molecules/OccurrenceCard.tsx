import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Occurrence } from "../../types/Occurrence";
import { getOccurrenceConfig } from "../../utils/occurence-helpers";
import DateHour from "@/shared/components/atoms/DateHour";
import VehicleName from "@/shared/components/atoms/VehicleName";

interface OccurenceCardProps {
    occurrence: Occurrence
}

export default function OccurrenceCard({ occurrence }: OccurenceCardProps) {

    const {icon : IconComponent } = getOccurrenceConfig(occurrence)

    const { brand, model, ownerId} = occurrence.defaults.vehicle

    return (
        <Card className="w-full shadow-sm">
            <div className="flex pl-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <IconComponent className="size-8" />
                </div>
                <CardContent className="w-full">
                    <div>
                        <div className="flex items-center justify-between">
                            <DateHour dateHour={occurrence.defaults.dateHour} />
                            <span>
                                {occurrence.defaults.location}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <VehicleName brand={brand} model={model} />
                            <p>
                                {ownerId}
                            </p>
                        </div>

                    </div>

                </CardContent>
            </div>
            <CardFooter className="flex justify-center text-md py-2">
                <Button variant="ghost" size="lg" className="w-full font-bold text-primary flex items-center justify-center gap-2 hover:text-primary hover:bg-transparent text-lg">
                    <Link href={`/ocorrencias/${occurrence.uuid}`}>
                        Ver Dados
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
