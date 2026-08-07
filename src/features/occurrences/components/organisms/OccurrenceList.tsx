import type { Occurrence } from "../../types/occurrence.type";
import OccurrenceCard from "../molecules/OccurrenceCard";

type OccurrenceListProps = {
  occurrences: Occurrence[];
  isLoading: boolean;
};

export default function OccurrenceList({
  occurrences,
  isLoading,
}: OccurrenceListProps) {
  if (isLoading) {
    return (
      <p className="py-8 text-center text-muted-foreground">
        Carregando ocorrências...
      </p>
    );
  }

  if (occurrences.length === 0) {
    return (
      <p className="py-8 text-center text-muted-foreground">
        Nenhuma ocorrência encontrada.
      </p>
    );
  }

  return (
    <section className="mb-24 flex flex-col gap-3 md:gap-0 md:overflow-hidden md:rounded-xl md:bg-card md:ring-1 md:ring-foreground/10">
      <div className="hidden grid-cols-[minmax(11rem,1fr)_minmax(0,1.3fr)_auto] items-center gap-3 border-b bg-muted/50 px-4 py-2 text-xs font-semibold text-muted-foreground md:grid">
        <span>Registro</span>
        <span>Veículo e local</span>
        <span className="text-right">Ações</span>
      </div>

      {occurrences.map((occurrence) => (
        <OccurrenceCard key={occurrence.uuid} occurrence={occurrence} />
      ))}
    </section>
  );
}
