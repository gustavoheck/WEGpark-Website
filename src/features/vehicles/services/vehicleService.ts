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
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

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

interface TokenUser {
  uuid?: string;
}

function getHiddenVehiclesStorageKey(): string | null {
  if (typeof window === "undefined") return null;

  const token = Cookies.get("auth_token");
  if (!token) return null;

  try {
    const { uuid } = jwtDecode<TokenUser>(token);
    return uuid ? `wegpark:hidden-vehicles:${uuid}` : null;
  } catch {
    return null;
  }
}

function getHiddenVehicleUuids(): Set<string> {
  const key = getHiddenVehiclesStorageKey();
  if (!key) return new Set();

  try {
    return new Set(JSON.parse(localStorage.getItem(key) ?? "[]") as string[]);
  } catch {
    return new Set();
  }
}

function setVehicleHidden(vehicleUuid: string, hidden: boolean): void {
  const key = getHiddenVehiclesStorageKey();
  if (!key) return;

  const hiddenVehicles = getHiddenVehicleUuids();
  if (hidden) hiddenVehicles.add(vehicleUuid);
  else hiddenVehicles.delete(vehicleUuid);
  localStorage.setItem(key, JSON.stringify([...hiddenVehicles]));
}

export async function saveVehicle(request: VehicleRequest): Promise<Vehicle> {
  const { data } = await api.post<VehicleResponse>("/vehicle", request);
  const vehicle = mapVehicleResponseToDomain(data);
  setVehicleHidden(vehicle.uuid, false);
  return vehicle;
}

export async function getMyVehicles(): Promise<Vehicle[]> {
  const { data } = await api.get<VehicleResponse[]>("/vehicle/me");
  const hiddenVehicles = getHiddenVehicleUuids();
  return data
    .map(mapVehicleResponseToDomain)
    .filter((vehicle) => !hiddenVehicles.has(vehicle.uuid));
}

export async function getVehicle(
  params: GetServiceProps = {},
  pageable: Partial<typeof DEFAULT_PAGEABLE> = {},
): Promise<VehiclePage> {
  const { category, value } = params;
  const requestedPageable = { ...DEFAULT_PAGEABLE, ...pageable };

  const { data } = await api.get<VehiclePageResponse>("/vehicle", {
    params: {
      ...(category && value ? { [category]: value } : {}),
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

export async function updateVehicle(
  uuid: string,
  request: UpdateVehicleRequest,
): Promise<Vehicle> {
  const { data } = await api.put<UpdateVehicleResponse>(
    `/vehicle/${uuid}`,
    request,
  );
  return mapVehicleResponseToDomain(data);
}

export async function requestVehicleAssociation(
  request: AssociationNotificationRequest,
): Promise<void> {
  await api.post("/vehicle/associate/notification", request);
}

export async function confirmVehicleAssociation(
  notificationUuid: string,
): Promise<AssociatedVehicleUserResponse> {
  const { data } = await api.post<AssociatedVehicleUserResponse>(
    `/vehicle/associate/${notificationUuid}`,
  );
  return data;
}

export async function unlinkVehicle(vehicleUuid: string): Promise<void> {
  await api.post(`/vehicle/associate/disable/${vehicleUuid}`);
  setVehicleHidden(vehicleUuid, true);
}
