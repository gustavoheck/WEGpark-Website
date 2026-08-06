import { useMutation, useQuery } from "@tanstack/react-query";

import type { GetServiceProps } from "@/shared/types/GetServiceProps";

import { OccurrenceType } from "../enums/occurrence-type";
import {
  createOccurrence,
  getMyOccurrenceById,
  getMyOccurrences,
  getOccurrenceById,
  getOccurrences,
  updateOccurrence,
} from "../services/occurrence.service";
import type {
  OccurrenceRequest,
  OccurrenceResponse,
  PaginatedOccurrencesResponse,
} from "../types/occurrence.type";

type OccurrencePagination = {
  page?: number;
};

function toQueryResult(
  query: ReturnType<typeof useQuery<PaginatedOccurrencesResponse>>,
) {
  const data = query.data;
  const page = data ? data.currentPage - 1 : 0;

  return {
    occurrences: data?.occurrences ?? [],
    isLoading: query.isLoading || query.isFetching,
    isError: query.isError,
    pagination: data
      ? {
          page,
          totalPages: data.totalPages,
          first: page === 0,
          last: page >= data.totalPages - 1,
        }
      : undefined,
  };
}

export function useGetOccurrences(
  filters?: GetServiceProps,
  enabled = true,
  pagination: OccurrencePagination = {},
) {
  const query = useQuery({
    queryKey: ["occurrences", filters, pagination],
    queryFn: () => getOccurrences(pagination.page ?? 0, filters),
    enabled,
  });

  return toQueryResult(query);
}

export function useGetMyOccurrences(
  enabled = true,
  pagination: OccurrencePagination = {},
) {
  const query = useQuery({
    queryKey: ["occurrences", "me", pagination],
    queryFn: () => getMyOccurrences(pagination.page ?? 0),
    enabled,
  });

  return toQueryResult(query);
}

export function useGetOccurrenceById() {
  return useMutation<OccurrenceResponse, Error, string>({
    mutationFn: getOccurrenceById,
  });
}

export function useGetMyOccurrenceById() {
  return useMutation<OccurrenceResponse, Error, string>({
    mutationFn: getMyOccurrenceById,
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
    { uuid: string; request: OccurrenceRequest; occurrenceType: OccurrenceType }
  >({
    mutationFn: ({ uuid, request, occurrenceType }) =>
      updateOccurrence(uuid, request, occurrenceType),
  });
}
