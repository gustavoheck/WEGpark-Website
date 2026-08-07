"use client";

import { useState } from "react";
import {
  Car,
  Check,
  ChevronDown,
  Eye,
  Pencil,
  Trash2,
  TriangleAlert,
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
import VehicleCardButton from "./VehicleCardButton";

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
  } = useVehicleCardActions(uuid, isOwner);

  function renderActions(compact = false) {
    return (
      <>
        <VehicleCardButton
          title="ver informações"
          Icon={Eye}
          href={`/veiculos/${encodeURIComponent(plate)}`}
          compact={compact}
        />
        <VehicleCardButton
          title="ver ocorrências"
          Icon={TriangleAlert}
          href="/ocorrencias"
          compact={compact}
        />
        <VehicleCardButton
          title="ver usuários"
          Icon={Users}
          href={`/veiculos/${encodeURIComponent(plate)}/usuarios`}
          compact={compact}
        />
        {canEdit && (
          <VehicleCardButton
            title="editar"
            Icon={Pencil}
            href={`/veiculos/${encodeURIComponent(plate)}/editar`}
            variant="last"
            compact={compact}
          />
        )}
        {canUnlink && (
          <VehicleCardButton
            title="desvincular"
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
            title="excluir"
            Icon={Trash2}
            destructive
            onClick={() => setIsUnlinkDialogOpen(true)}
            variant="last"
            pending={isUnlinking}
            compact={compact}
          />
        )}
      </>
    );
  }

  return (
    <>
      <Collapsible
        open={isExpanded}
        onOpenChange={setIsExpanded}
        className="w-full md:hidden"
      >
        <Card size="sm" className="w-full gap-0 shadow-sm">
          <CardHeader className="flex min-w-0 flex-row items-start gap-3 pb-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Car className="size-6" />
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <div className="flex flex-wrap items-center justify-between gap-1.5">
                <span className="break-all text-base font-bold tracking-wider text-foreground">
                  {plate}
                </span>
                <Badge
                  variant="outline"
                  className="max-w-full font-semibold capitalize mix-blend-multiply"
                >
                  <span className="truncate">{color}</span>
                </Badge>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-1.5">
                <VehicleName brand={brand} model={model} />
                {isOwner ? (
                  <Badge className="flex shrink-0 items-center gap-1 text-xs">
                    <Check className="size-3.5 text-white" />
                    Proprietário
                  </Badge>
                ) : null}
              </div>
            </div>
          </CardHeader>

          <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
            <CardContent className="border-t border-dashed bg-muted/20 py-3">
              <div className="grid w-full grid-cols-1 gap-2 min-[380px]:grid-cols-2">
                {renderActions()}
              </div>
            </CardContent>
          </CollapsibleContent>

          <CardFooter className="flex justify-center border-t bg-muted/50 p-2">
            <CollapsibleTrigger
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
                className:
                  "flex w-full items-center justify-center gap-2 font-bold text-primary hover:bg-transparent hover:text-primary aria-expanded:bg-transparent aria-expanded:text-primary",
              })}
            >
              <span>{isExpanded ? "Ver Menos" : "Ver Mais"}</span>
              <ChevronDown
                className={`size-4 transition-transform duration-300 ${
                  isExpanded ? "rotate-180" : "rotate-0"
                }`}
              />
            </CollapsibleTrigger>
          </CardFooter>
        </Card>
      </Collapsible>

      <div className="hidden min-h-16 grid-cols-[minmax(0,1.3fr)_minmax(7rem,0.7fr)_auto] items-center gap-3 border-b px-4 py-2 last:border-b-0 md:grid">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Car className="size-5" />
          </div>
          <div className="min-w-0">
            <p className="truncate font-bold tracking-wide text-foreground">
              {plate}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {brand}{" "}
              <span className="font-medium text-foreground">{model}</span>
            </p>
          </div>
        </div>

        <div className="flex min-w-0 flex-col items-start gap-1">
          <Badge
            variant="outline"
            className="max-w-full font-semibold capitalize mix-blend-multiply"
          >
            <span className="truncate">{color}</span>
          </Badge>
          {isOwner ? (
            <span className="flex items-center gap-1 text-xs font-medium text-primary">
              <Check className="size-3.5" />
              Proprietário
            </span>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center justify-end gap-1">
          {renderActions(true)}
        </div>
      </div>

      <AlertDialog
        open={isUnlinkDialogOpen && isOwner}
        onOpenChange={setIsUnlinkDialogOpen}
        title="Excluir Veículo"
        description="Você realmente deseja excluir esse veículo? Esta ação removerá seu vínculo e os vínculos de todos os usuários com esse veículo."
        onClick={handleUnlink}
        confirmText="Excluir"
        pending={isUnlinking}
      />

      <AlertDialog
        open={isUnlinkDialogOpen && !isOwner}
        onOpenChange={setIsUnlinkDialogOpen}
        title="Desvincular Veículo"
        description="Você realmente deseja se desvincular desse veículo? Esta ação removerá seu vínculo, e você só poderá recuperá-lo ao pedir permissão novamente."
        onClick={handleUnlink}
        confirmText="Desvincular"
        pending={isUnlinking}
      />
    </>
  );
}
