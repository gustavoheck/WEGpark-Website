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
  const { icon: IconComponent } = getOccurrenceConfig(occurrence);
  const { brand, model, ownerId } = occurrence.defaults.vehicle;
  const [isExpanded, setIsExpanded] = useState(false);
  const { user } = useAuth();
  const editRoute = "/ocorrencias/" + occurrence.uuid + "/editar";
  const canEdit = user ? canAccessRoute(user.currentRole, editRoute) : false;

  return (
    <Collapsible
      open={isExpanded}
      onOpenChange={setIsExpanded}
      className="w-full"
    >
      <Card className="w-full gap-0 shadow-sm">
        <div className="flex pl-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <IconComponent className="size-8" />
          </div>
          <CardHeader className="w-full">
            <div>
              <div className="flex items-center justify-between">
                <DateHour dateHour={occurrence.defaults.dateHour} />
                <span>{occurrence.defaults.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <VehicleName brand={brand} model={model} />
                <p>{ownerId}</p>
              </div>
            </div>
          </CardHeader>
        </div>

        <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          <CardContent className="border-t border-dashed bg-muted/20 py-4">
            <div className="grid w-full grid-cols-2 gap-3">
              <OccurrenceCardButton
                title="ver dados"
                Icon={Eye}
                href={"/ocorrencias/" + occurrence.uuid}
                variant={canEdit ? undefined : "last"}
              />
              {canEdit ? (
                <OccurrenceCardButton
                  title="editar"
                  Icon={Pencil}
                  href={editRoute}
                />
              ) : null}
            </div>
          </CardContent>
        </CollapsibleContent>

        <CardFooter className="flex justify-center border-t bg-muted/50 p-3">
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
              className={
                "size-5 transition-transform duration-300 " +
                (isExpanded ? "rotate-180" : "rotate-0")
              }
            />
          </CollapsibleTrigger>
        </CardFooter>
      </Card>
    </Collapsible>
  );
}
