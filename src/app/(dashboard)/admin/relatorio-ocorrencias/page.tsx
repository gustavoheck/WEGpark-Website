"use client";

import { useEffect } from "react";

import { AdminPageHeader } from "@/features/admin/components/molecules/AdminPageHeader";
import OccurrenceList from "@/features/occurrences/components/organisms/OccurrenceList";
import { useGet } from "@/features/occurrences/hooks/useGet";

export default function RelatorioOcorrenciasPage() {
  const { mutate, data, isPending } = useGet();

  useEffect(() => {
    mutate({});
  }, [mutate]);

  return (
    <section>
      <AdminPageHeader title="Relatório de Ocorrências" />
      
    </section>
  );
}