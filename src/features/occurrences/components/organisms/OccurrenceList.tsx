"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
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

      <div className="grid grid-cols-1 gap-4 pb-24 lg:grid-cols-2 2xl:grid-cols-3">
        {occurrencesList.map((occurrence) => (
          <OccurrenceCard key={occurrence.uuid} occurrence={occurrence} />
        ))}
      </div>

      {canCreate ? (
        <Link
          href="/ocorrencias/cadastrar"
          className={buttonVariants({
            variant: "default",
            className:
              "fixed right-4 bottom-4 z-50 w-fit max-w-[calc(100vw-2rem)] rounded-sm px-4 py-6 text-base font-bold shadow-lg sm:text-xl",
          })}
        >
          <Plus className="size-5 sm:size-7" />
          Cadastrar Ocorrência
        </Link>
      ) : null}
    </section>
  );
}
