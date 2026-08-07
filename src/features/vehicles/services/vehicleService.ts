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
const FILTER_PAGE_SIZE = 100;

function normalizePlate(value: string): string {
  return value.trim().toUpperCase().replaceAll("-", "");
}

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
  const requestedPageable = { ...DEFAULT_PAGEABLE, ...pageable };

  if (category === "plate" && value?.trim()) {
    const firstPage = await api.get<VehiclePageResponse>("/vehicle", {
      params: { page: 0, size: FILTER_PAGE_SIZE },
    });
    const remainingPages = await Promise.all(
      Array.from(
        { length: Math.max(0, firstPage.data.totalPages - 1) },
        (_, index) =>
          api.get<VehiclePageResponse>("/vehicle", {
            params: { page: index + 1, size: FILTER_PAGE_SIZE },
          }),
      ),
    );
    const normalizedSearch = normalizePlate(value);
    const filteredVehicles = [
      ...firstPage.data.content,
      ...remainingPages.flatMap((response) => response.data.content),
    ]
      .map(mapVehicleResponseToDomain)
      .filter((vehicle) =>
        normalizePlate(vehicle.plate).includes(normalizedSearch),
      );
    const start = requestedPageable.page * requestedPageable.size;
    const totalPages = Math.ceil(
      filteredVehicles.length / requestedPageable.size,
    );

    return {
      vehicles: filteredVehicles.slice(
        start,
        start + requestedPageable.size,
      ),
      totalPages,
      totalElements: filteredVehicles.length,
      page: requestedPageable.page,
      size: requestedPageable.size,
      first: requestedPageable.page === 0,
      last: totalPages === 0 || requestedPageable.page >= totalPages - 1,
    };
  }

  const normalizedValue =
    category === "plate"
      ? value && normalizePlate(value)
      : value?.trim();

  const { data } = await api.get<VehiclePageResponse>("/vehicle", {
    params: {
      ...(category && normalizedValue ? { [category]: normalizedValue } : {}),
      ...requestedPageable,
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

export async function findVehicleByPlate(plate: string): Promise<Vehicle | null> {
  const normalizedPlate = plate.trim().toUpperCase();
  const result = await getVehicle(
    { category: "plate", value: normalizedPlate },
    { page: 0, size: 1 },
  );

  return (
    result.vehicles.find(
      (vehicle) => vehicle.plate.trim().toUpperCase() === normalizedPlate,
    ) ?? null
  );
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
