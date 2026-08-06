// features/occurrences/services/updateService.ts
import { api } from "@/shared/lib/api";
import {
    UpdateWarningFormValues,
    UpdateIllegalParkingFormValues,
    UpdateTrafficAccidentFormValues,
} from "../schemas/UpdateOccurrenceSchema";
import OccurrencesListMock from "../mocks/OccurrenceListMock";

function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function updateMockOccurrence(uuid: string, changes: Record<string, unknown>) {
    const index = OccurrencesListMock.findIndex((occurrence) => occurrence.uuid === uuid);
    if (index === -1) throw new Error("Ocorrência não encontrada");

    const { location, gate, ...specificChanges } = changes;
    const current = OccurrencesListMock[index];

    OccurrencesListMock[index] = {
        ...current,
        ...specificChanges,
        defaults: {
            ...current.defaults,
            ...(location ? { location } : {}),
            ...(gate ? { gate } : {}),
        },
    } as BaseWarning | IllegalParking | TrafficAccident;

    return OccurrencesListMock[index];
}

export async function updateWarning(uuid: string, data: UpdateWarningFormValues) {
    if (process.env.NEXT_PUBLIC_USE_MOCKS === "true") {
        await delay(500);
        return updateMockOccurrence(uuid, data);
    }

    const { data: response } = await api.put(`/occurrence/warning/${uuid}`, data);
    return response;
}

export async function updateIllegalParking(uuid: string, data: UpdateIllegalParkingFormValues) {
    if (process.env.NEXT_PUBLIC_USE_MOCKS === "true") {
        await delay(500);
        return updateMockOccurrence(uuid, data);
    }

    const { data: response } = await api.put(`/occurrence/illegal-parking/${uuid}`, data);
    return response;
}

export async function updateTrafficAccident(uuid: string, data: UpdateTrafficAccidentFormValues) {
    if (process.env.NEXT_PUBLIC_USE_MOCKS === "true") {
        await delay(500);
        return updateMockOccurrence(uuid, data);
    }

    const { data: response } = await api.put(`/occurrence/traffic-accident/${uuid}`, data);
    return response;
}