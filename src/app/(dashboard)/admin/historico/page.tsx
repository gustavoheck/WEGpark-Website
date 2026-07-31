"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import OccurrenceList from "@/features/occurrences/components/organisms/OccurrenceList";
import OccurrencesListMock from "@/features/occurrences/mocks/OccurrenceListMock";
import { Plus } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export default function HistoricoOcorrenciasPage() {
  const router = useRouter();
  return (
    <section>
      <OccurrenceList
        occurrences={OccurrencesListMock}
      />
   

      <Button
        className={cn(
          "fixed bottom-4 right-4 text-xl rounded-sm py-6 font-bold z-50",
          open() ? "left-68" : "left-4"
        )}
        variant="default"
        onClick={() => router.push("/admin/relatorio-ocorrencias")}
      >
        <Plus className="size-7" />
        Gerar Relatório
      </Button>

    </section>
  );
}