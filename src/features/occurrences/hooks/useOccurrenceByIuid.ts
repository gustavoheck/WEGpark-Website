"use client";

import { useQuery } from "@tanstack/react-query";
import OccurrencesListMock from "@/features/occurrences/mocks/OccurrenceListMock";

export function useOccurrenceByUuid(uuid: string) {
  return useQuery({
    queryKey: ["occurrence", "detail", uuid],
    queryFn: async () => {
      return OccurrencesListMock.find((o) => o.uuid === uuid) ?? null;
    },
    enabled: !!uuid,
  });
}