import { api } from "@/shared/lib/api";

import { OccurrenceRequest, OccurrenceResponse, PaginatedOccurrencesResponse, WarningRequest } from "../types/occurrence.type";
import { OccurrenceType } from "../enums/occurrence-type";
import { GetServiceProps } from "@/shared/types/GetServiceProps";
import { BackendPage } from "@/shared/types/Page";
import { mapBackEndPageToOccurence } from "../mappers/occurrence.mapper";

const PAGE_SIZE = 15

export async function createOccurrence(
    request: OccurrenceRequest,
    occurrenceType: OccurrenceType
) : Promise<OccurrenceResponse> {
    const { data } = await api.post<OccurrenceResponse>("/occurrence/" + OccurrenceType[occurrenceType].toLowerCase(), request)
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
    const { data } = await api.get<OccurrenceResponse>("/ocurrence/" + uuid)

    return data

}

export async function updateOcurrence (
    uuid : string,
    
)

export async function updateWarning(uuid: string, data: WarningRequest) {
    const { data: response } = await api.put(`/occurrence/warning/${uuid}`, data);
    return response;
}

export async function updateIllegalParking(uuid: string, data: UpdateIllegalParkingFormValues) {
    const { data: response } = await api.put(`/occurrence/illegal-parking/${uuid}`, data);
    return response;
}

export async function updateTrafficAccident(uuid: string, data: UpdateTrafficAccidentFormValues) {
    const { data: response } = await api.put(`/occurrence/traffic-accident/${uuid}`, data);
    return response;
}
