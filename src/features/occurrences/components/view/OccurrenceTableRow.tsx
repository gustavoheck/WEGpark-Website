"use client";

import { Eye, Pencil } from "lucide-react";

import {
  TableCell,
  TableRow,
} from "@/components/ui/table";
import DateHour from "@/shared/components/atoms/DateHour";
import { canAccessRoute } from "@/shared/config/accessControl";
import { useAuth } from "@/shared/context/AuthContext";

import type { Occurrence } from "../../types/occurrence.type";
import { getOccurrenceConfig } from "../../utils/occurence-helpers";
import OccurrenceCardButton from "../atoms/OccurenceCardButton";

interface OccurrenceTableRowProps {
  occurrence: Occurrence;
}

export default function OccurrenceTableRow({
  occurrence,
}: OccurrenceTableRowProps) {
  const { icon: IconComponent, label } =
    getOccurrenceConfig(occurrence);

  const {
    brand = "",
    model = "",
    vehicleUsers = [],
  } = occurrence.defaults?.vehicle ?? {};

  const ownerName =
    vehicleUsers.find((vehicleUser) => vehicleUser.isOwner)?.name ??
    "—";

  const { user } = useAuth();

  const detailRoute = `/ocorrencias/${occurrence.uuid}`;
  const editRoute = `${detailRoute}/editar`;

  const canEdit = user
    ? canAccessRoute(user.currentRole, editRoute)
    : false;

  return (
    <TableRow>
      <TableCell>
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <IconComponent className="size-5" />
          </div>

          <div className="min-w-0">
            <p className="truncate font-semibold text-foreground">
              {label}
            </p>

            <DateHour
              dateHour={occurrence.defaults.dateHour}
            />
          </div>
        </div>
      </TableCell>

      <TableCell>
        <div className="min-w-0">
          <p className="truncate font-medium text-foreground">
            {brand} {model}
          </p>

          <p className="truncate text-xs text-muted-foreground">
            {occurrence.defaults.location}
          </p>

          <p
            className="truncate text-xs text-muted-foreground"
            title={ownerName}
          >
            {ownerName}
          </p>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex items-center justify-end gap-1">
          <OccurrenceCardButton
            title="Ver dados"
            Icon={Eye}
            href={detailRoute}
            variant={canEdit ? undefined : "last"}
            compact
          />

          {canEdit ? (
            <OccurrenceCardButton
              title="Editar"
              Icon={Pencil}
              href={editRoute}
              variant="last"
              compact
            />
          ) : null}
        </div>
      </TableCell>
    </TableRow>
  );
}