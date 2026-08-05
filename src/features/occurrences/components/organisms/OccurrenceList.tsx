"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useSidebar } from "@/components/ui/sidebar";
import SectionTitle from "@/shared/components/atoms/SectionTitle";
import Filter, { FilterParams } from "@/shared/components/molecules/Filter";
import { canAccessRoute } from "@/shared/config/accessControl";
import { useAuth } from "@/shared/context/AuthContext";
import { getApiErrorMessage } from "@/shared/lib/getApiErrorMessage";
import { cn } from "@/shared/lib/utils";
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
  const { isMobile } = useSidebar();
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

      <div className="flex flex-col gap-4">
        {occurrencesList.map((occurrence) => (
          <OccurrenceCard key={occurrence.uuid} occurrence={occurrence} />
        ))}
      </div>

      {canCreate ? (
        <Link
          href="/ocorrencias/cadastrar"
          className={cn(
            buttonVariants({ variant: "default" }),
            "fixed right-4 bottom-4 z-50 rounded-sm py-6 text-xl font-bold",
            isMobile ? "left-4" : "left-68",
          )}
        >
          <Plus className="size-7" />
          Cadastrar Ocorrência
        </Link>
      ) : null}
    </section>
  );
}
