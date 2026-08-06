import type Vehicle from "@/shared/types/Vehicle";

import type { VehicleRequest, VehicleResponse } from "../types/vehicle";
import type { VehicleFormData } from "../schemas/VehicleSchema";

export function mapVehicleResponseToDomain(response: VehicleResponse): Vehicle {
  return {
    uuid: response.uuid,
    plate: response.plate.toUpperCase(),
    model: response.model,
    brand: response.brand,
    color: response.color,
    vehicleUsers: response.vehicleUsers ?? [],
  };
}

export function mapFormDataToVehicleRequest(data: VehicleFormData): VehicleRequest {
  return {
    plate: data.plate.trim().toUpperCase(),
    brand: data.brand.trim(),
    model: data.model.trim(),
    color: data.color.trim(),
  };
}
