import { api } from "@/shared/lib/api";

import { OccurrenceRequest, OccurrenceResponse, PaginatedOccurrencesResponse } from "../types/occurrence.type";
import { OccurrenceType } from "../enums/occurrence-type";
import { GetServiceProps } from "@/shared/types/GetServiceProps";
import { BackendPage } from "@/shared/types/Page";
import { mapBackEndPageToOccurence } from "../mappers/occurrence.mapper";

const PAGE_SIZE = 15

export async function createOccurrence(
    request: OccurrenceRequest,
    occurrenceType: OccurrenceType
) : Promise<OccurrenceResponse> {
    const { data } = await api.put<OccurrenceResponse>("/occurrence/" + OccurrenceType[occurrenceType].toLowerCase(), request)
    return data;
}

export async function getOccurrences(
    page: number,
    filters: GetServiceProps = {}
): Promise<PaginatedOccurrencesResponse> {
    const { category, value } = filters;

    const params = {
        page,
        size: PAGE_SIZE,
        ...(category && value ? { [category]: value } : {})
    }

    const { data } = await api.get<BackendPage<OccurrenceResponse>>("/occurrence/me", {
        params
    })
    return mapBackEndPageToOccurence(data)
}

export async function getMyOccurrences(page: number): Promise<PaginatedOccurrencesResponse> {
    const { data } = await api.get<BackendPage<OccurrenceResponse>>("/occurrence/me", {
        params: {
            page,
            size: PAGE_SIZE
        }
    })
    return mapBackEndPageToOccurence(data)
}

export async function getOccurrenceById(uuid: string) : Promise<OccurrenceResponse> {
    const { data } = await api.get<OccurrenceResponse>("/occurrence/" + uuid)

    return data

}

export async function updateOccurrence (
    uuid : string,
    request : OccurrenceRequest,
    occurrenceType : OccurrenceType
) : Promise<OccurrenceResponse> {
    const { data } = await api.put<OccurrenceResponse>(`/occurrence/${OccurrenceType[occurrenceType].toLowerCase()}/${uuid}` ,request)
    return data
}

