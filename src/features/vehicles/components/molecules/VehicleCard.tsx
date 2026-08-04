'use client'

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Vehicle from "../../../../shared/types/Vehicle";
import { Car, Check, ChevronDown, Eye, Pencil, Trash2, Unlink, Users, } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import VehicleCardButton from "../atoms/VehicleCardButton";
import { buttonVariants } from "@/components/ui/button"
import AlertDialog from "@/shared/components/organisms/AlertDialog";
import VehicleName from "@/shared/components/atoms/VehicleName";
import { useVehiclePermissions } from "../../hooks/useVehiclePermissions";
import { useVehicleCardActions } from "../../hooks/useVehicleCardActions";

interface VehicleCardProps {
    vehicle: Vehicle
}


export default function VehicleCard({ vehicle }: VehicleCardProps) {

    const { uuid, plate, brand, model, color} = vehicle
    const [isExpanded, setIsExpanded] = useState(false)

    const { canDelete, canEdit, canUnlink, isOwner} = useVehiclePermissions(vehicle)

    const { isUnlinkDialogOpen, setIsUnlinkDialogOpen, handleUnlink, isUnlinking } = useVehicleCardActions(uuid)

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
                            <div className="flex items-center gap-2">
                                <span className="text-md text-muted-foreground">Cor:</span>
                                <Badge variant="outline" className="capitalize text-md mix-blend-multiply font-semibold">
                                    {color}
                                </Badge>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <VehicleName brand={brand} model={model}/>
                            {isOwner && (
                                <Badge className="flex items-center gap-1 text-md">
                                    <Check className="size-8 text-white" />
                                    Proprietário
                                </Badge>
                            )}

                        </div>
                    </div>
                </CardHeader>
                <CollapsibleContent className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
                    <CardContent className="py-4 border-t border-dashed bg-muted/20">
                        <div className="grid grid-cols-2 gap-3 w-full">
                            <VehicleCardButton title="ver ocorrências" Icon={Eye} href="/ocorrencias" />
                            <VehicleCardButton title="ver usuarios" Icon={Users} href={`/veiculos/${encodeURIComponent(plate)}/usuarios`} />
                            { canEdit && (
                                <VehicleCardButton title="editar" Icon={Pencil} href={`/veiculos/${encodeURIComponent(plate)}/editar`} variant="last"/>
                            )}
                            { canUnlink && (
                                <VehicleCardButton title="desvincular" Icon={Unlink} destructive onClick={() => setIsUnlinkDialogOpen(true)} variant="last" pending={isUnlinking} />
                            )}
                            { canDelete && (
                                <VehicleCardButton title="excluir" Icon={Trash2} destructive onClick={() => setIsUnlinkDialogOpen(true)} variant="last" pending={isUnlinking} />
                            )}
                        </div>
                    </CardContent>
                </CollapsibleContent>
                <CardFooter className="bg-muted/50 border-t p-3 flex justify-center">
                    <CollapsibleTrigger
                        className={buttonVariants({
                            variant: "ghost",
                            className: "w-full font-bold text-primary flex items-center justify-center gap-2 aria-expanded:text-primary aria-expanded:bg-transparent hover:text-primary hover:bg-transparent"
                        })}
                    >
                        <span className="text-lg">{isExpanded ? "Ver Menos" : "Ver Mais"}</span>
                        <ChevronDown className={`size-5 transition-transform duration-300 ${isExpanded ? "rotate-180" : "rotate-0"}`} />
                    </CollapsibleTrigger>
                </CardFooter>

                <AlertDialog
                    open={isUnlinkDialogOpen && isOwner}
                    onOpenChange={setIsUnlinkDialogOpen}
                    title="Excluir Veículo"
                    description="Você realmente deseja exluir esse veículo? Esta ação removerá seu vinculo, e os vinculos de todos os usuários com esse veículo."
                    onClick={handleUnlink}
                    confirmText="Excluir"
                />

                <AlertDialog
                    open={isUnlinkDialogOpen && !isOwner}
                    onOpenChange={setIsUnlinkDialogOpen}
                    title="Desvincular Veículo"
                    description="Você realmente deseja se desvincular desse veículo? Esta ação removerá seu vinculo, e você apenas o recupera-la ao pedir permissão novamente."
                    onClick={handleUnlink}
                    confirmText="Desvincular"
                />
            </Card>
        </Collapsible>
    )
}
