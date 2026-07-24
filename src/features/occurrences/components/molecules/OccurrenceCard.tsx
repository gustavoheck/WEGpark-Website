import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CircleParkingOff, StickyNote, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isWarning, isIllegalParking, isTrafficAccident } from '../../utils/occurrence-guards';
import Link from "next/link";
import { Occurrence } from "../../types/Occurrence";

interface OccurenceCardProps {
    occurrence: Occurrence
}

export default function OccurrenceCard({ occurrence }: OccurenceCardProps) {

    const dateTime : Date = new Date(occurrence.defaults.dateHour)
    const formato = dateTime.toLocaleString("pt-BR")

    return (
        <Card className="w-full shadow-sm">
            <div className="flex pl-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    {isWarning(occurrence) ? (
                        <StickyNote className="size-8" />
                    ) : (
                        isIllegalParking(occurrence) ? (
                            <CircleParkingOff className="size-8" />
                        ) : (
                            <TriangleAlert className="size-8" />
                        )
                    )}

                </div>
                <CardContent className="w-full">
                    <div>
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="font-bold">
                                    {formato.substring(0,10)}
                                </span>
                                <span>
                                    {` ás ${formato.substring(12,17)}`}
                                </span>
                            </div>
                            <span>
                                {occurrence.defaults.location}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-lg text-muted-foreground">
                                {occurrence.defaults.vehicle.brand} <span className="font-medium text-foreground">{occurrence.defaults.vehicle.model}</span>
                            </p>
                            <p>
                                {occurrence.defaults.vehicle.ownerId}
                            </p>
                        </div>

                    </div>

                </CardContent>
            </div>
            <CardFooter className="flex justify-center text-md py-2">
                <Button variant="ghost" size="lg" className="w-full font-bold text-primary flex items-center justify-center gap-2 aria-expanded:text-primary aria-expanded:bg-transparent hover:text-primary hover:bg-transparent text-lg">
                    <Link href={`/ocorrencias/${occurrence.uuid}`}>
                        Ver Dados
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
