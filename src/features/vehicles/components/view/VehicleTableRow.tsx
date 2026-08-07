import { Car, Check, Eye, Pencil, Trash2, TriangleAlert, Unlink, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
    TableCell,
    TableRow,
} from "@/components/ui/table";
import Vehicle from "@/shared/types/Vehicle";
import { useVehiclePermissions } from "../../hooks/useVehiclePermissions";
import VehicleCardButton from "./VehicleCardButton";
import { useVehicleCardActions } from "../../hooks/useVehicleCardActions";

interface VehicleTableRowProps {
    vehicle: Vehicle;
    compact?: boolean
}

export default function VehicleTableRow({
    vehicle, compact = false
}: VehicleTableRowProps) {
    const { uuid, plate, brand, model, color } = vehicle;
    const { canDelete, canEdit, canUnlink, isOwner } =
        useVehiclePermissions(vehicle);
    const {
        isUnlinkDialogOpen,
        setIsUnlinkDialogOpen,
        handleUnlink,
        isUnlinking,
    } = useVehicleCardActions(uuid, isOwner);

    return (
        <TableRow>
            <TableCell>
                <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <Car className="size-5" />
                    </div>

                    <div>
                        <p className="font-bold tracking-wide">{plate}</p>
                        <p className="text-xs text-muted-foreground">
                            {brand}{" "}
                            <span className="font-medium text-foreground">
                                {model}
                            </span>
                        </p>
                    </div>
                </div>
            </TableCell>

            <TableCell>
                <div className="flex flex-col items-start gap-1">
                    <Badge variant="outline" className="capitalize">
                        {color}
                    </Badge>

                    {isOwner && (
                        <span className="flex items-center gap-1 text-xs text-primary">
                            <Check className="size-3.5" />
                            Proprietário
                        </span>
                    )}

                </div>
            </TableCell>

            <TableCell>
                <div className="flex justify-end gap-1">
                    <VehicleCardButton
                        title="Ver Informações"
                        Icon={Eye}
                        href={`/veiculos/${encodeURIComponent(plate)}`}
                        compact={compact}
                    />
                    <VehicleCardButton
                        title="Ver Ocorrências"
                        Icon={TriangleAlert}
                        href="/ocorrencias"
                        compact={compact}
                    />
                    <VehicleCardButton
                        title="Ver Usuários"
                        Icon={Users}
                        href={`/veiculos/${encodeURIComponent(plate)}/usuarios`}
                        compact={compact}
                    />
                    {canEdit && (
                        <VehicleCardButton
                            title="Editar"
                            Icon={Pencil}
                            href={`/veiculos/${encodeURIComponent(plate)}/editar`}
                            variant="last"
                            compact={compact}
                        />
                    )}
                    {canUnlink && (
                        <VehicleCardButton
                            title="Desvincular"
                            Icon={Unlink}
                            destructive
                            onClick={() => setIsUnlinkDialogOpen(true)}
                            variant="last"
                            pending={isUnlinking}
                            compact={compact}
                        />
                    )}
                    {canDelete && (
                        <VehicleCardButton
                            title="Excluir"
                            Icon={Trash2}
                            destructive
                            onClick={() => setIsUnlinkDialogOpen(true)}
                            variant="last"
                            pending={isUnlinking}
                            compact={compact}
                        />
                    )}
                </div>
            </TableCell>
        </TableRow>
    );
}