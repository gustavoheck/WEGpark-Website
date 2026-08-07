"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";

import { Skeleton } from "@/components/ui/skeleton";
import DetailOccurrence from "@/features/occurrences/components/molecules/DetailOccurrence";
import {
  useGetMyOccurrenceById,
  useGetOccurrenceById,
} from "@/features/occurrences/hooks/useOccurrence";
import BackButton from "@/shared/components/atoms/BackButton";
import SectionTitle from "@/shared/components/atoms/SectionTitle";
import { useAuth } from "@/shared/context/AuthContext";
import { SystemRole } from "@/shared/enum/SystemRoleType";

export default function OccurrenceDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const generalOccurrenceQuery = useGetOccurrenceById();
  const myOccurrenceQuery = useGetMyOccurrenceById();
  const isParkUser = user?.currentRole === SystemRole.PARK;
  const { mutate: getOccurrence, data: occurrence, isPending, isError } =
    isParkUser ? myOccurrenceQuery : generalOccurrenceQuery;

  useEffect(() => {
    if (user) {
      getOccurrence(id);
    }
  }, [getOccurrence, id, user]);

  return (
    <section>
      <div className="relative flex w-full items-center justify-center gap-3 pt-8 pb-10">
        <BackButton />
        <SectionTitle text="detalhes da ocorrência" className="py-0" />
      </div>

      {isPending ? <Skeleton className="h-96 w-full" /> : null}
      {isError ? (
        <p className="text-sm text-destructive">
          Não foi possível carregar a ocorrência.
        </p>
      ) : null}
      {occurrence ? <DetailOccurrence occurrence={occurrence} /> : null}
    </section>
  );
}
