"use client";

import { useState } from "react";
import {
  Car,
  Check,
  ChevronDown,
  Eye,
  Pencil,
  Trash2,
  Unlink,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import VehicleName from "@/shared/components/atoms/VehicleName";
import AlertDialog from "@/shared/components/organisms/AlertDialog";
import Vehicle from "@/shared/types/Vehicle";

import { useVehicleCardActions } from "../../hooks/useVehicleCardActions";
import { useVehiclePermissions } from "../../hooks/useVehiclePermissions";
import VehicleCardButton from "../atoms/VehicleCardButton";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  const { uuid, plate, brand, model, color } = vehicle;
  const [isExpanded, setIsExpanded] = useState(false);
  const { canDelete, canEdit, canUnlink, isOwner } =
    useVehiclePermissions(vehicle);
  const {
    isUnlinkDialogOpen,
    setIsUnlinkDialogOpen,
    handleUnlink,
    isUnlinking,
  } = useVehicleCardActions(uuid);

  return (
    <Collapsible
      open={isExpanded}
      onOpenChange={setIsExpanded}
      className="h-full w-full"
    >
      <Card className="h-full w-full gap-0 shadow-sm">
        <CardHeader className="flex min-w-0 flex-row items-start gap-3 pb-4 sm:items-center">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground sm:size-12">
            <Car className="size-7 sm:size-8" />
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="break-all text-lg font-bold tracking-wider text-foreground">
                {plate}
              </span>
              <div className="flex min-w-0 flex-wrap items-center gap-2">
                <span className="text-sm text-muted-foreground sm:text-base">
                  Cor:
                </span>
                <Badge
                  variant="outline"
                  className="max-w-full font-semibold capitalize mix-blend-multiply"
                >
                  <span className="truncate">{color}</span>
                </Badge>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2">
              <VehicleName brand={brand} model={model} />
              {isOwner ? (
                <Badge className="flex shrink-0 items-center gap-1">
                  <Check className="size-4 text-white" />
                  Proprietário
                </Badge>
              ) : null}
            </div>
          </div>
        </CardHeader>

        <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          <CardContent className="border-t border-dashed bg-muted/20 py-4">
            <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
              <VehicleCardButton
                title="ver ocorrências"
                Icon={Eye}
                href="/ocorrencias"
              />
              <VehicleCardButton
                title="ver usuários"
                Icon={Users}
                href={`/veiculos/${encodeURIComponent(plate)}/usuarios`}
              />
              {canEdit ? (
                <VehicleCardButton
                  title="editar"
                  Icon={Pencil}
                  href={`/veiculos/${encodeURIComponent(plate)}/editar`}
                  variant="last"
                />
              ) : null}
              {canUnlink ? (
                <VehicleCardButton
                  title="desvincular"
                  Icon={Unlink}
                  destructive
                  onClick={() => setIsUnlinkDialogOpen(true)}
                  variant="last"
                  pending={isUnlinking}
                />
              ) : null}
              {canDelete ? (
                <VehicleCardButton
                  title="excluir"
                  Icon={Trash2}
                  destructive
                  onClick={() => setIsUnlinkDialogOpen(true)}
                  variant="last"
                  pending={isUnlinking}
                />
              ) : null}
            </div>
          </CardContent>
        </CollapsibleContent>

        <CardFooter className="mt-auto flex justify-center border-t bg-muted/50 p-3">
          <CollapsibleTrigger
            className={buttonVariants({
              variant: "ghost",
              className:
                "flex w-full items-center justify-center gap-2 font-bold text-primary hover:bg-transparent hover:text-primary aria-expanded:bg-transparent aria-expanded:text-primary",
            })}
          >
            <span className="text-lg">
              {isExpanded ? "Ver Menos" : "Ver Mais"}
            </span>
            <ChevronDown
              className={`size-5 transition-transform duration-300 ${
                isExpanded ? "rotate-180" : "rotate-0"
              }`}
            />
          </CollapsibleTrigger>
        </CardFooter>

        <AlertDialog
          open={isUnlinkDialogOpen && isOwner}
          onOpenChange={setIsUnlinkDialogOpen}
          title="Excluir Veículo"
          description="Você realmente deseja excluir esse veículo? Esta ação removerá seu vínculo e os vínculos de todos os usuários com esse veículo."
          onClick={handleUnlink}
          confirmText="Excluir"
        />

        <AlertDialog
          open={isUnlinkDialogOpen && !isOwner}
          onOpenChange={setIsUnlinkDialogOpen}
          title="Desvincular Veículo"
          description="Você realmente deseja se desvincular desse veículo? Esta ação removerá seu vínculo, e você só poderá recuperá-lo ao pedir permissão novamente."
          onClick={handleUnlink}
          confirmText="Desvincular"
        />
      </Card>
    </Collapsible>
  );
}
