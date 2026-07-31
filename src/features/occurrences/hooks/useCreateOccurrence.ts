"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOccurrence } from "../services/createService";
import { CreateOccurrenceFormValues } from "../schemas/CreateOccurrenceSchema";

export function useCreateOccurrence() {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: ({ data, vehicleId }: { data: CreateOccurrenceFormValues; vehicleId: string }) => createOccurrence(data, vehicleId), onSuccess: () => queryClient.invalidateQueries({ queryKey: ["occurrence"] }) });
}
