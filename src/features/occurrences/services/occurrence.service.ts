import { api } from "@/shared/lib/api";
import type { GetServiceProps } from "@/shared/types/GetServiceProps";
import type { BackendPage } from "@/shared/types/Page";

import type {
  OccurrenceRequest,
  OccurrenceResponse,
  PaginatedOccurrencesResponse,
} from "../types/occurrence.type";
import { OccurrenceType } from "../enums/occurrence-type";
import { mapBackEndPageToOccurence } from "../mappers/occurrence.mapper";

const PAGE_SIZE = 15;

export async function createOccurrence(
  request: OccurrenceRequest,
  occurrenceType: OccurrenceType,
): Promise<OccurrenceResponse> {
  const { data } = await api.post<OccurrenceResponse>(
    `/occurrence/${occurrenceType.toLowerCase().replace("_", "-")}`,
    request,
  );
  return data;
}

export async function getOccurrences(
  page: number,
  filters: GetServiceProps = {},
): Promise<PaginatedOccurrencesResponse> {
  const { category, value } = filters;
  const { data } = await api.get<BackendPage<OccurrenceResponse>>("/occurrence", {
    params: {
      page,
      size: PAGE_SIZE,
      ...(category && value ? { [category]: value } : {}),
    },
  });

  return mapBackEndPageToOccurence(data);
}

export async function getMyOccurrences(
  page: number,
): Promise<PaginatedOccurrencesResponse> {
  const { data } = await api.get<BackendPage<OccurrenceResponse>>(
    "/occurrence/me",
    { params: { page, size: PAGE_SIZE } },
  );

  return mapBackEndPageToOccurence(data);
}

export async function getOccurrenceById(uuid: string): Promise<OccurrenceResponse> {
  const { data } = await api.get<OccurrenceResponse>(`/occurrence/${uuid}`);
  return data;
}

export async function getMyOccurrenceById(
  uuid: string,
): Promise<OccurrenceResponse> {
  const { data } = await api.get<OccurrenceResponse>(`/occurrence/me/${uuid}`);
  return data;
}
export async function updateOccurrence(
  uuid: string,
  request: OccurrenceRequest,
  occurrenceType: OccurrenceType,
): Promise<OccurrenceResponse> {
  const { data } = await api.put<OccurrenceResponse>(
    `/occurrence/${occurrenceType.toLowerCase().replace("_", "-")}/${uuid}`,
    request,
  );
  return data;
}
