"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { toast } from "@/components/ui/toast";
import FloatingActionLink from "@/shared/components/atoms/FloatingActionLink";
import SectionTitle from "@/shared/components/atoms/SectionTitle";
import Filter, { FilterParams } from "@/shared/components/molecules/Filter";
import { canAccessRoute } from "@/shared/config/accessControl";
import { useAuth } from "@/shared/context/AuthContext";
import { getApiErrorMessage } from "@/shared/lib/getApiErrorMessage";
import FilterCategory from "@/shared/types/FilterCategory";

import { useGet } from "../../hooks/useGet";
import { Occurrence } from "../../types/Occurrence";
import { getOccurrenceConfig } from "../../utils/occurence-helpers";
import OccurrenceCard from "../molecules/OccurrenceCard";

interface OccurrenceListProps {
  occurrences: Occurrence[];
}

const filtersObject: FilterCategory[] = [
  { text: "Placa", value: "plate" },
  { text: "Data", value: "yearMonth" },
  { text: "Portaria", value: "gate" },
  { text: "Tipo", value: "occurrenceType" },
  { text: "Local", value: "location" },
];

export default function OccurrenceList({
  occurrences: initialOccurrences,
}: OccurrenceListProps) {
  const [occurrencesList, setOccurrencesList] =
    useState<Occurrence[]>(initialOccurrences);
  const { mutate: getOccurrence } = useGet();
  const { user } = useAuth();
  const canCreate = user
    ? canAccessRoute(user.currentRole, "/ocorrencias/cadastrar")
    : false;

  function onSubmit(params: FilterParams) {
    if (process.env.NEXT_PUBLIC_USE_MOCKS === "true") {
      const searchTerm = params.value.trim().toLocaleLowerCase();

      if (!searchTerm) {
        setOccurrencesList(initialOccurrences);
        return;
      }

      setOccurrencesList(
        initialOccurrences.filter((occurrence) => {
          const { defaults } = occurrence;
          const occurrenceType = getOccurrenceConfig(occurrence).label;
          const searchableValues: Record<string, string> = {
            plate: defaults.vehicle.plate,
            yearMonth: defaults.dateHour,
            gate: defaults.gate,
            occurrenceType,
            location: defaults.location,
          };

          return searchableValues[params.category]
            ?.toLocaleLowerCase()
            .includes(searchTerm);
        }),
      );
      return;
    }

    getOccurrence(params, {
      onSuccess: (data) => {
        setOccurrencesList(data);
      },
      onError: (error) => {
        toast.add({
          type: "error",
          description: getApiErrorMessage(
            error,
            "Não foi possível filtrar as ocorrências.",
          ),
        });
      },
    });
  }

  return (
    <section>
      <SectionTitle text="ocorrências" />
      <Filter filters={filtersObject} onSubmit={onSubmit} />

      <div className="flex flex-col gap-3 mb-24 md:gap-0 md:overflow-hidden md:rounded-xl md:bg-card md:ring-1 md:ring-foreground/10">
        <div className="hidden grid-cols-[minmax(11rem,1fr)_minmax(0,1.3fr)_auto] items-center gap-3 border-b bg-muted/50 px-4 py-2 text-xs font-semibold text-muted-foreground md:grid">
          <span>Registro</span>
          <span>Veículo e local</span>
          <span className="text-right">Ações</span>
        </div>

        {occurrencesList.map((occurrence) => (
          <OccurrenceCard key={occurrence.uuid} occurrence={occurrence} />
        ))}
      </div>

      {canCreate ? (
        <FloatingActionLink
          href="/ocorrencias/cadastrar"
          label="Cadastrar Ocorrência"
          Icon={Plus}
        />
      ) : null}
    </section>
  );
}
