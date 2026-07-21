'use client'

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Vehicle from "../../types/Vehicle";
import { Car, Check, ChevronDown, Eye, Pencil, Trash2, Users, } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import VehicleCardButton from "../atoms/VehicleCardButton";
import { buttonVariants } from "@/components/ui/button"

interface VehicleCardProps {
    vehicle: Vehicle
}


export default function VehicleCard({ vehicle }: VehicleCardProps) {

    const {id, plate, brand, model, color, ownerId } = vehicle

    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded} className="w-full">
            <Card className="w-full shadow-sm gap-0">
                <CardHeader className="flex flex-row items-center space-x-4 pb-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <Car className="size-8" />
                    </div>
                    <div className="flex flex-1 flex-col">
                        <div className="flex items-center justify-between">
                            <span className="text-lg font-bold tracking-wider text-foreground">
                                {plate}
                            </span>
                            {ownerId === 1 && (
                                <Badge className="flex items-center gap-1 text-md">
                                    <Check className="size-8 text-white" />
                                    Proprietário
                                </Badge>
                            )}
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-lg text-muted-foreground">
                                {brand} <span className="font-medium text-foreground">{model}</span>
                            </p>
                            <div className="flex items-center gap-2">
                                <span className="text-md text-muted-foreground">Cor:</span>
                                <Badge variant="outline" className="capitalize text-md mix-blend-multiply font-semibold">
                                    {color}
                                </Badge>
                            </div>

                        </div>
                    </div>
                </CardHeader>
                <CollapsibleContent className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
                    <CardContent className="py-4 border-t border-dashed bg-muted/20">
                        <div className="grid grid-cols-2 gap-3 w-full">
                            <VehicleCardButton title="ver ocorrências" Icon={Eye} href="/ocorrencias" />
                            <VehicleCardButton title="ver usuarios" Icon={Users} href="/ocorrencias" />
                            <VehicleCardButton title="editar" Icon={Pencil} href={`/veiculos/${id}/editar`} />
                            <VehicleCardButton title="excluir" Icon={Trash2} href="/ocorrencias" destructive />
                        </div>
                    </CardContent>
                </CollapsibleContent>
                <CardFooter className="bg-muted/50 border-t p-3 flex justify-center">
                    <CollapsibleTrigger
                        className={buttonVariants({
                            variant: "ghost",
                            size: "lg",
                            className: "w-full font-bold text-primary flex items-center justify-center gap-2 aria-expanded:text-primary aria-expanded:bg-transparent hover:text-primary hover:bg-transparent"
                        })}
                    >
                        <span className="text-lg">{isExpanded ? "Ver Menos" : "Ver Mais"}</span>
                        <ChevronDown className={`size-5 transition-transform duration-300 ${isExpanded ? "rotate-180" : "rotate-0"}`} />
                    </CollapsibleTrigger>
                </CardFooter>
            </Card>
        </Collapsible>

    )
}