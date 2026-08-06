import { useMutation } from "@tanstack/react-query";
import { getOccurrences } from "../services/occurrence.service";
import type { GetServiceProps } from "@/shared/types/GetServiceProps";

export function useGet() {
  return useMutation({ mutationFn: async (filters: GetServiceProps) => (await getOccurrences(0, filters)).occurrences });
}
