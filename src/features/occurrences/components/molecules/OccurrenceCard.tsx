"use client";

import { useState } from "react";
import { ChevronDown, Eye, Pencil } from "lucide-react";

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
import DateHour from "@/shared/components/atoms/DateHour";
import VehicleName from "@/shared/components/atoms/VehicleName";
import { canAccessRoute } from "@/shared/config/accessControl";
import { useAuth } from "@/shared/context/AuthContext";

import { Occurrence } from "../../types/Occurrence";
import { getOccurrenceConfig } from "../../utils/occurence-helpers";
import OccurrenceCardButton from "../atoms/OccurenceCardButton";

interface OccurrenceCardProps {
  occurrence: Occurrence;
}

export default function OccurrenceCard({ occurrence }: OccurrenceCardProps) {
  const { icon: IconComponent, label } = getOccurrenceConfig(occurrence);
  const { brand, model, ownerId } = occurrence.defaults.vehicle;
  const [isExpanded, setIsExpanded] = useState(false);
  const { user } = useAuth();
  const detailRoute = `/ocorrencias/${occurrence.uuid}`;
  const editRoute = `${detailRoute}/editar`;
  const canEdit = user ? canAccessRoute(user.currentRole, editRoute) : false;

  function renderActions(compact = false) {
    return (
      <>
        <OccurrenceCardButton
          title="ver dados"
          Icon={Eye}
          href={detailRoute}
          variant={canEdit ? undefined : "last"}
          compact={compact}
        />
        {canEdit ? (
          <OccurrenceCardButton
            title="editar"
            Icon={Pencil}
            href={editRoute}
            compact={compact}
          />
        ) : null}
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
              <IconComponent className="size-6" />
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <div className="flex flex-wrap items-center justify-between gap-1.5">
                <span className="font-semibold text-foreground">{label}</span>
                <DateHour dateHour={occurrence.defaults.dateHour} />
              </div>
              <p className="break-words text-sm text-muted-foreground">
                {occurrence.defaults.location}
              </p>
              <div className="flex min-w-0 flex-wrap items-center justify-between gap-1.5">
                <VehicleName brand={brand} model={model} />
                <span className="max-w-full truncate text-xs text-muted-foreground">
                  {ownerId}
                </span>
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

      <div className="hidden min-h-16 grid-cols-[minmax(11rem,1fr)_minmax(0,1.3fr)_auto] items-center gap-3 border-b px-4 py-2 last:border-b-0 md:grid">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <IconComponent className="size-5" />
          </div>
          <div className="min-w-0">
            <p className="truncate font-semibold text-foreground">{label}</p>
            <DateHour dateHour={occurrence.defaults.dateHour} />
          </div>
        </div>

        <div className="min-w-0">
          <p className="truncate font-medium text-foreground">
            {brand} {model}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {occurrence.defaults.location}
          </p>
          <p className="truncate text-xs text-muted-foreground" title={ownerId}>
            {ownerId}
          </p>
        </div>

        <div className="flex items-center justify-end gap-1">
          {renderActions(true)}
        </div>
      </div>
    </>
  );
}
