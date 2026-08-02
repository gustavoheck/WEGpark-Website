import { api } from "@/shared/lib/api";
import Vehicle from "@/shared/types/Vehicle";
import { VehicleRequest, VehicleResponse } from "../types/vehicle";
import { GetServiceProps } from "@/shared/types/GetServiceProps";
import { mapVehicleResponseToDomain } from "../mappers/vehicleMapper";

export async function saveVehicle( request : VehicleRequest
): Promise<Vehicle> {
    const { data } = await api.post<VehicleResponse>("/vehicle", request);
    return mapVehicleResponseToDomain(data);
}

export async function getMyVehicles(): Promise<Vehicle[]> {
  const { data } = await api.get<VehicleResponse[]>("/vehicle/me");
  return data.map(mapVehicleResponseToDomain);
}

export async function getVehicle( params: GetServiceProps = {} ): Promise<Vehicle[]> {
  const { category, value } = params;

  const { data } = await api.get<VehicleResponse[]>("/vehicle", {
    params: category && value ? { [category]: value } : {},
  });
  return data.map(mapVehicleResponseToDomain);
}

export async function getVehicleByPlate( plate : string ): Promise<Vehicle> {
    const { data } = await api.get<VehicleResponse>(`/vehicle/plate/${plate}`);
    return mapVehicleResponseToDomain(data);
}

export async function updateVehicle( 
    uuid : string, 
    request : VehicleRequest
): Promise<Vehicle> {
    const { data } = await api.put<VehicleResponse>(`/vehicle/${uuid}`, request);
    return mapVehicleResponseToDomain(data);
}

export async function deleteVehicle( uuid : string ): Promise<null> {
    await api.delete(`/vehicles/${uuid}`);
    return null;
}
