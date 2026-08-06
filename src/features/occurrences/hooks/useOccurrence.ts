import { useMutation } from "@tanstack/react-query";
import {
  OccurrenceRequest,
  OccurrenceResponse,
  PaginatedOccurrencesResponse,
} from "../types/occurrence.type";
import {
  createOccurrence,
  getMyOccurrences,
  getOccurrenceById,
  getOccurrences,
  updateOccurrence,
} from "../services/occurrence.service";
import { GetServiceProps } from "@/shared/types/GetServiceProps";
import { OccurrenceType } from "../enums/occurrence-type";

export function useGetOccurrenceById() {
  return useMutation<OccurrenceResponse, Error, string>({
    mutationFn: getOccurrenceById,
  });
}

export function useGetMyOccurrences() {
  return useMutation<PaginatedOccurrencesResponse, Error, number>({
    mutationFn: getMyOccurrences,
  });
}

export function useGetOccurrence() {
  return useMutation<
    PaginatedOccurrencesResponse,
    Error,
    { page: number; filters?: GetServiceProps }
  >({
    mutationFn: ({ page, filters }) => getOccurrences(page, filters || {}),
  });
}

export function useCreate() {
  return useMutation<
    OccurrenceResponse,
    Error,
    { request: OccurrenceRequest; occurrenceType: OccurrenceType }
  >({
    mutationFn: ({ request, occurrenceType }) =>
      createOccurrence(request, occurrenceType),
  });
}

export function useUpdate() {
  return useMutation<
    OccurrenceResponse,
    Error,
    { uuid : string, request: OccurrenceRequest; occurrenceType: OccurrenceType }
  >({
    mutationFn: ({ uuid, request, occurrenceType }) =>
      updateOccurrence(uuid, request, occurrenceType),
  });
}

