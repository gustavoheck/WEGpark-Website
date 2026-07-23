import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Occurence } from "../../types/Occurence";
import Link from "next/link";
import { CircleParkingOff, StickyNote, TriangleAlert } from "lucide-react";

interface OccurenceCardProps {
    occurrence: Occurence
}

export default function OccurrenceCard({ occurrence }: OccurenceCardProps) {
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
                            <span>
                                {occurrence.dateTime}
                            </span>
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
            <CardFooter>
                <Link href="#" >Ver dados</Link>
            </CardFooter>
        </Card>
        //<Collapsible open={isExpanded} onOpenChange={setIsExpanded} className="w-full">
        //    <Card className="w-full shadow-sm gap-0">
        //        <CardHeader className="flex flex-row items-center space-x-4 pb-4">
        //            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        //                <Car className="size-8" />
        //            </div>
        //            <div className="flex flex-1 flex-col">
        //                <div className="flex items-center justify-between">
        //                    <span className="text-lg font-bold tracking-wider text-foreground">
        //                        {plate}
        //                    </span>
        //                    <div className="flex items-center gap-2">
        //                        <span className="text-md text-muted-foreground">Cor:</span>
        //                        <Badge variant="outline" className="capitalize text-md mix-blend-multiply font-semibold">
        //                            {color}
        //                        </Badge>
        //                    </div>
        //                </div>
        //                <div className="flex items-center justify-between">
        //                    <p className="text-lg text-muted-foreground">
        //                        {brand} <span className="font-medium text-foreground">{model}</span>
        //                    </p>
        //                    {ownerId === 1 && (
        //                        <Badge className="flex items-center gap-1 text-md">
        //                            <Check className="size-8 text-white" />
        //                            Proprietário
        //                        </Badge>
        //                    )}
        //
        //                </div>
        //            </div>
        //        </CardHeader>
        //        <CollapsibleContent className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
        //            <CardContent className="py-4 border-t border-dashed bg-muted/20">
        //                <div className="grid grid-cols-2 gap-3 w-full">
        //                    <VehicleCardButton title="ver ocorrências" Icon={Eye} href="/ocorrencias" />
        //                    <VehicleCardButton title="ver usuarios" Icon={Users} href={`/veiculos/${id}/usuarios`} />
        //                    {isOwner ? (
        //                        <>
        //                            <VehicleCardButton title="editar" Icon={Pencil} href={`/veiculos/${id}/editar`} />
        //                            <VehicleCardButton title="excluir" Icon={Trash2} destructive onClick={() => setIsOpenDeleteConfirmation(true)} />
        //                        </>
        //                    ) : (
        //                        <VehicleCardButton title="desvincular" Icon={Unlink} destructive onClick={() => setIsOpenUnlinkConfirmation(true)} variant="last" />
        //                    )
        //
        //                    }
        //
        //                </div>
        //            </CardContent>
        //        </CollapsibleContent>
        //        <CardFooter className="bg-muted/50 border-t p-3 flex justify-center">
        //            <CollapsibleTrigger
        //                className={buttonVariants({
        //                    variant: "ghost",
        //                    size: "lg",
        //                    className: "w-full font-bold text-primary flex items-center justify-center gap-2 aria-expanded:text-primary aria-expanded:bg-transparent hover:text-primary hover:bg-transparent"
        //                })}
        //            >
        //                <span className="text-lg">{isExpanded ? "Ver Menos" : "Ver Mais"}</span>
        //                <ChevronDown className={`size-5 transition-transform duration-300 ${isExpanded ? "rotate-180" : "rotate-0"}`} />
        //            </CollapsibleTrigger>
        //        </CardFooter>
        //
        //        <AlertDialog
        //            open={isOpenDeleteConfirmation}
        //            onOpenChange={setIsOpenDeleteConfirmation}
        //            title="Excluir Veículo"
        //            description="Você realmente deseja exluir esse veículo? Esta ação removerá seu vinculo, e os vinculos de todos os usuários com esse veículo."
        //            onClick={() => { onSubmit("delete") }}
        //            confirmText="Excluir"
        //        />
        //
        //        <Dialog
        //            open={isOpenDeleteInformative}
        //            onOpenChange={setIsOpenDeleteInformative}
        //            title="Veículo Excluído"
        //            description="Veículo e vínculos relacionados a ele excluidos com sucesso"
        //        />
        //
        //        <AlertDialog
        //            open={isOpenUnlinkConfirmation}
        //            onOpenChange={setIsOpenUnlinkConfirmation}
        //            title="Desvincular Veículo"
        //            description="Você realmente deseja se desvincular desse veículo? Esta ação removerá seu vinculo, e você apenas o recupera-la ao pedir permissão novamente."
        //            onClick={() => { onSubmit("unlink") }}
        //            confirmText="Desvincular"
        //        />
        //
        //        <Dialog
        //            open={isOpenUnlinkInformative}
        //            onOpenChange={setIsOpenUnlinkConfirmation}
        //            title="Veículo Desvinculado"
        //            description="Veículo desvinculado de vossa pessoa."
        //        />
        //    </Card>
        //</Collapsible>
    )
}
