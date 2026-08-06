import { api } from "@/shared/lib/api";
import { Occurrence } from "../types/Occurrence";
import { UpdateIllegalParkingFormValues, UpdateTrafficAccidentFormValues, UpdateWarningFormValues } from "../schemas/UpdateOccurrenceSchema";

interface getServiceProps {
  category?: string;
  value?: string;
}

export async function getOccurrence(
  params: getServiceProps = {}
): Promise<Occurrence[]> {
  const { category, value } = params;

  const { data } = await api.get<Occurrence[]>("/occurrence", {
    params: category && value ? { [category]: value } : {},
  });

  return data;
}

export async function updateWarning(uuid: string, data: UpdateWarningFormValues) {
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