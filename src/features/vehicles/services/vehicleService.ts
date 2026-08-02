import { api } from "@/shared/lib/api";
import Vehicle from "@/shared/types/Vehicle";
import {
  AssociatedVehicleUserResponse,
  AssociationNotificationRequest,
  UpdateVehicleRequest,
  UpdateVehicleResponse,
  VehiclePageResponse,
  VehicleRequest,
  VehicleResponse,
} from "../types/vehicle";
import { GetServiceProps } from "@/shared/types/GetServiceProps";
import { mapVehicleResponseToDomain } from "../mappers/vehicleMapper";

const DEFAULT_PAGEABLE = {
  page: 0,
  size: 10,
  sort: [],
};

export interface VehiclePage {
  vehicles: Vehicle[];
  totalPages: number;
  totalElements: number;
  page: number;
  size: number;
  first: boolean;
  last: boolean;
}

export async function saveVehicle( request : VehicleRequest
): Promise<Vehicle> {
    const { data } = await api.post<VehicleResponse>("/vehicle", request);
    return mapVehicleResponseToDomain(data);
}

export async function getMyVehicles(): Promise<Vehicle[]> {
  const { data } = await api.get<VehicleResponse[]>("/vehicle/me");
  return data.map(mapVehicleResponseToDomain);
}

export async function getVehicle(
  params: GetServiceProps = {},
  pageable: Partial<typeof DEFAULT_PAGEABLE> = {},
): Promise<VehiclePage> {
  const { category, value } = params;
  const filter = category && value ? { [category]: value } : {};
  const requestedPageable = { ...DEFAULT_PAGEABLE, ...pageable };

  const { data } = await api.get<VehiclePageResponse>("/vehicle", {
    // The API receives both values as query objects (`filter` and `pageable`).
    // They are serialized as JSON because the backend exposes them as object
    // parameters instead of individual query parameters such as `plate`.
    params: {
      filter: JSON.stringify(filter),
      pageable: JSON.stringify(requestedPageable),
    },
  });

  return {
    vehicles: data.content.map(mapVehicleResponseToDomain),
    totalPages: data.totalPages,
    totalElements: data.totalElements,
    page: data.number,
    size: data.size,
    first: data.first,
    last: data.last,
  };
}

export async function updateVehicle( 
    uuid : string, 
    request : UpdateVehicleRequest
): Promise<Vehicle> {
    const { data } = await api.put<UpdateVehicleResponse>(`/vehicle/${uuid}`, request);
    return mapVehicleResponseToDomain(data);
}

export async function requestVehicleAssociation(request: AssociationNotificationRequest): Promise<void> {
  await api.post("/vehicle/associate/notification", request);
}

export async function confirmVehicleAssociation(notificationUuid: string): Promise<AssociatedVehicleUserResponse> {
  const { data } = await api.post<AssociatedVehicleUserResponse>(`/vehicle/associate/${notificationUuid}`);
  return data;
}

export async function unlinkVehicle(vehicleUuid: string): Promise<void> {
  await api.post(`/vehicle/associate/disable/${vehicleUuid}`);
}
