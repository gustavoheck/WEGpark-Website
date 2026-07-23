import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CircleParkingOff, StickyNote, TriangleAlert } from "lucide-react";
import { Occurence } from "../../types/Occurrence";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface OccurenceCardProps {
    occurrence: Occurence
}

export default function OccurrenceCard({ occurrence }: OccurenceCardProps) {

    const dateTime : Date = new Date(occurrence.dateTime)
    const formato = dateTime.toLocaleString("pt-BR")

    return (
        <Card className="w-full shadow-sm">
            <div className="flex pl-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    {occurrence.type === "aviso" ? (
                        <StickyNote className="size-8" />
                    ) : (
                        occurrence.type === "uso-irregular-vaga" ? (
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
                                {occurrence.locale}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-lg text-muted-foreground">
                                {occurrence.vehicle.brand} <span className="font-medium text-foreground">{occurrence.vehicle.model}</span>
                            </p>
                            <p>
                                {occurrence.vehicle.ownerId}
                            </p>
                        </div>

                    </div>

                </CardContent>
            </div>
            <CardFooter className="flex justify-center text-md py-2">
                <Button variant="ghost" size="lg" className="w-full font-bold text-primary flex items-center justify-center gap-2 aria-expanded:text-primary aria-expanded:bg-transparent hover:text-primary hover:bg-transparent text-lg">
                    <Link href={`/ocorrencias/${occurrence.id}`}>
                        Ver Dados
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
