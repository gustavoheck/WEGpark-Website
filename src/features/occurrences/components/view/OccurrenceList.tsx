import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { Occurrence } from "../../types/occurrence.type";
import OccurrenceCard from "./OccurrenceCard";
import OccurrenceTableRow from "./OccurrenceTableRow";

type OccurrenceListProps = {
  occurrences: Occurrence[];
};

export default function OccurrenceList({
  occurrences,
}: OccurrenceListProps) {
  return (
    <>
      <div className="mb-4 flex flex-col gap-3 md:hidden">
        {occurrences.map((occurrence) => (
          <OccurrenceCard
            key={occurrence.uuid}
            occurrence={occurrence}
          />
        ))}
      </div>

      <div className="mb-4 hidden overflow-hidden rounded-lg border md:block">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>Ocorrência</TableHead>
              <TableHead>Veículo e local</TableHead>
              <TableHead className="text-right">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {occurrences.map((occurrence) => (
              <OccurrenceTableRow
                key={occurrence.uuid}
                occurrence={occurrence}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}